/**
 * server.js
 */
var flash = require('connect-flash'),
    passport = require('passport'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy,
    express = require('express'),
    http = require('http'),
    path = require('path'),
    requestProcesser = require("./request-processer"),
    config = require("../config.json"),
    properties = require("../properties.json"),
    d = require('domain').create();


passport.serializeUser(function(user, done) {
    done(null, user);
});


passport.deserializeUser(function(user, done) {
    if (user) {
        done(null, user);
    } else {
        done(new Error('User  does not exist'));
    }
});


passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, function(username, password, done) {
    process.nextTick(function() {
        requestProcesser.auth(username, password, function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Login failed  for ' + username
                });
            } else {
                requestProcesser.getRoleByUserName(username,
                    function(roleName) {
                        user.roleName = roleName.name;
                        requestProcesser.getTeamByUserId(user.id, function(
                            team) {
                            if (team) {
                                user.teamId = team.id;
                                user.teamName = team.name;
                            }
                            return done(null, user);
                        });
                    });
            }
        });
    });
}));



var app = express();

//ejs
var pbc = path.join(__dirname, '../public/');
app.use(express.static(pbc));
app.set('views', pbc);
app.engine('html', require('ejs').renderFile);


app.use(express.cookieParser());

app.use(express.methodOverride());

app.use(express.session({
    secret: config.session.key,
    cookie: {
        _expires: config.session.maxAge
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// all environments
app.set('port', process.env.PORT || config.server_config.port);
// app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/teams', ensureAuthenticated, function(request, response) {
    response.render('teams.html', {
        user: request.user,
        message: request.flash('error')
    });
});

app.get('/dashboard', ensureAuthenticated, function(request, response) {
    response.render('dashboard.html', {
        user: request.user,
        message: request.flash('error')
    });
});

app.get('/timesheet', ensureAuthenticated, function(request, response) {
    response.render('timesheet.html', {
        user: request.user,
        message: request.flash('error')
    });
});

app.get('/usertimesheet', ensureAuthenticated, function(request, response) {
    requestProcesser.getUserById(request.param('id'), function(res) {
        response.render('usertimesheet.html', {
            user: request.user,
            message: request.flash('error'),
            selectedUser: res
        });
    });
});


app.get('/register', function(request, response) {
    response.render('register.html');
});

app.get('/profile', ensureAuthenticated, function(request, response) {
    response.render('profile.html', {
        user: request.user,
        message: request.flash('error')
    });
});

app.get('/forgotpassword', function(request, response) {
    response.render('forgotpassword.html');
});

app.get('/report', ensureAuthenticated, function(request, response) {
    var selectedUserId = request.param('id');
    if (selectedUserId) {
        requestProcesser.getUserById(request.param('id'), function(res) {
            response.render('report.html', {
                user: request.user,
                message: request.flash('error'),
                selectedUser: res
            });
        });
    } else {
        response.render('report.html', {
            user: request.user,
            message: request.flash('error')
        });
    }
});

app.get('/', ensureAuthenticated, function(request, response) {
    response.render('login.html');
});

app.get('/admin', ensureAuthenticated, function(request, response) {
    var teams = null,
        roles = null;
    requestProcesser.getTeamsAsObj(request, response, function(res) {
        teams = res;
        complete();
    });
    requestProcesser.getRolesAsObj(request, response, function(res) {
        roles = res;
        complete();
    });

    function complete() {
        if (teams !== null && roles !== null) {
            response.render('admin.html', {
                user: request.user,
                teams: teams,
                roles: roles,
                message: request.flash('error')
            });
        }
    }
});

//LOGIN SERVICE
app.post('/signin',
    passport.authenticate('local', {
        successRedirect: '/loggedIn',
        failureRedirect: '/',
        failureFlash: true
    }));


app.get('/signout', function(request, response) {
    request.logout();
    response.redirect('/');
});


//first login redirection
app.get('/loggedIn', ensureAuthenticated);

// USER SERVICS
app.get('/getUser', ensureAuthenticated, requestProcesser.getUser);
app.get('/getTeamUsersAndAvailability', ensureAuthenticated, requestProcesser.getTeamUsersAndAvailability);
app.get('/getNonTeamUsers', ensureAuthenticated, requestProcesser.getNonTeamUsers);
app.get('/getLeads', ensureAuthenticated, requestProcesser.getLeads);

app.post('/saveUser', requestProcesser.saveUser);
app.post('/editUser', ensureAuthenticated, requestProcesser.editUser);
app.post('/mapUser', ensureAuthenticated, requestProcesser.mapUser);

app.post('/changePassword', ensureAuthenticated, requestProcesser.changePassword);
app.post('/resetPassword', requestProcesser.resetPassword);

//PROJECT SERVICES
app.get('/getProjects', ensureAuthenticated, requestProcesser.getProjects);
app.get('/getProject', ensureAuthenticated, requestProcesser.getProject);
app.get('/addMyProject', ensureAuthenticated, requestProcesser.addMyProject);

app.get('/getAdminProjects', ensureAuthenticated, requestProcesser.getAdminProjects);
app.post('/saveAdminProject', ensureAuthenticated, requestProcesser.saveAdminProject);
app.post('/editAdminProject', ensureAuthenticated, requestProcesser.editAdminProject);

app.post('/saveProject', ensureAuthenticated, requestProcesser.saveProject);
app.post('/editProject', ensureAuthenticated, requestProcesser.editProject);

app.post('/addResourceToProject', ensureAuthenticated, requestProcesser.addResourceToProject);
app.post('/removeResourceFromProject', ensureAuthenticated, requestProcesser.removeResourceFromProject);
app.post('/addNRemoveResourceFromProject', ensureAuthenticated, requestProcesser.addNRemoveResourceFromProject);

app.get('/getMyProjects', ensureAuthenticated, requestProcesser.getMyProjects);
app.get('/getUserProjects', ensureAuthenticated, requestProcesser.getUserProjects);
app.post('/removeMyProject', ensureAuthenticated, requestProcesser.removeMyProject);

app.post('/userExist', requestProcesser.userExist);


//TEAM SERVICES
app.post('/saveTeam', ensureAuthenticated, requestProcesser.saveTeam);
app.post('/editTeam', ensureAuthenticated, requestProcesser.editTeam);
app.post('/removeTeam', ensureAuthenticated, requestProcesser.removeTeam);
app.get('/getTeams', requestProcesser.getTeams);

//give temp permissions
app.post('/setPermissions', ensureAuthenticated, requestProcesser.setPermissions);
app.get('/hasLogAccess', ensureAuthenticated, requestProcesser.hasLogAccess);
app.get('/getTeamUsersByTeamId', ensureAuthenticated, requestProcesser.getTeamUsersByTeamId);

//ROLE SERVICES
app.post('/saveRole', ensureAuthenticated, requestProcesser.saveRole);
app.post('/editRole', ensureAuthenticated, requestProcesser.editRole);
app.post('/removeRole', ensureAuthenticated, requestProcesser.removeRole);
app.get('/getRoles', requestProcesser.getRoles);

//LOG SERVICE
app.post('/saveLog', ensureAuthenticated, requestProcesser.saveLog);
app.post('/editLog', ensureAuthenticated, requestProcesser.editLog);
app.get('/getLogs', ensureAuthenticated, requestProcesser.getLogs);
app.get('/getUserLogs', ensureAuthenticated, requestProcesser.getUserLogs);
app.get('/getLog', ensureAuthenticated, requestProcesser.getLogById);
app.get('/getLogHistoryById', ensureAuthenticated, requestProcesser.getLogHistoryById);

app.get('/getLogStatuses', ensureAuthenticated, requestProcesser.getLogStatuses);

app.get('/getUserReportLogs', ensureAuthenticated, requestProcesser.getUserReportLogs);
app.get('/getReportLogs', ensureAuthenticated, requestProcesser.getReportLogs);

app.get('/getDetailedUserReportLogs', ensureAuthenticated, requestProcesser.getDetailedUserReportLogs);
app.get('/getDetailedReportLogs', ensureAuthenticated, requestProcesser.getDetailedReportLogs);


//method to get logs of any team
app.get('/getTeamReport', ensureAuthenticated, function(request, response){
	var teamId = request.param('teamId');	
	request.user.teamId = teamId;
	response.redirect('/report');
});


app.get('/unlockLog', ensureAuthenticated, requestProcesser.unlockLog);
app.get('/unlockLogRequest', ensureAuthenticated, requestProcesser.unlockLogRequest);

d.on('error', function(err) {
    console.log("Caught with some error : " + err)
})

d.run(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.url === '/loggedIn' || req.url === '/') {
            if (req.user.roleName === properties.roles.manager) {
                res.redirect('/dashboard');
            } else if (req.user.roleName === properties.roles.admin) {
                res.redirect('/admin');
            } else if (req.user.roleName === properties.roles.seniormanager) {
                res.redirect('/teams');
            } else {
                res.redirect('/timesheet');
            }
        } else if (restrictedPages(properties.roles.user, req.url) && req.user.roleName === properties.roles.user) {
            res.redirect('/timesheet');
        } else if (restrictedPages(properties.roles.manager, req.url) && req.user.roleName === properties.roles.manager) {
            res.redirect('/dashboard');
        } else if (restrictedPages(properties.roles.admin, req.url) && req.user.roleName === properties.roles.admin) {
            res.redirect('/admin');
        } else {
            return next();
        }
    } else {
        res.render('login.html', {
            message: req.flash('error')
        });
    }
}

//url restrictions restrictedPages(request.user.roleName, request.url,callback);
function restrictedPages(key, reqUrl) {
    var urls = {};
    urls[properties.roles.user] = ['admin', 'dashboard'];
    urls[properties.roles.manager] = ['admin'];
    urls[properties.roles.admin] = ['dashboard', 'timesheet', 'report'];
	urls[properties.roles.seniormanager] = ['dashboard', 'timesheet','admin'];
    if (urls.hasOwnProperty(key)) {
        var arr = urls[key];
        for (var i = 0; i < arr.length; i++) {
            if (reqUrl === '/' + arr[i]) {
                return true;
            }
            if ((arr.length - 1) === i) {
                return false;
            }
        }
    }

}