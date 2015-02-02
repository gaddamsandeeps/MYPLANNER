/**
 * server.js
 */
var flash = require('connect-flash'),
    passport = require('passport'),
    util = require('util'),
    async = require("async"),
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
                async.series({
                        roleName: function(callback) {
                            requestProcesser.getRoleByUserNameObj(username, function(val) {
                                callback(null, val);
                            });
                        },
                        team: function(callback) {
                            requestProcesser.getTeamByLeadIdObj(user.id, function(val) {
                                callback(null, val);
                            });
                        },
                        teamId: function(callback) {
                            requestProcesser.getTeamByUserId(user.id, function(val) {
                                callback(null, val);
                            });
                        }
                    },
                    function(err, results) {
                        user.roleName = results.roleName.name;
                        if (results.team) {
                            user.teamId = results.team.id;
                            user.teamName = results.team.name;
                            user.hasTeam = true;                         
                        }else{
                            user.hasTeam = false;
                        }
                        if(results.roleName.name === properties.roles.manager) {
                            user.isLead = true;
                        }else{
                            user.isLead = false;
                            if(results.teamId){
                               user.teamId = results.teamId.id;
                            }
                        }
                        return done(null, user);

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

app.get('/dashboard', ensureAuthenticated, function(request, response) {
    response.render('dashboard.html', {
        user: request.user,
        message: request.flash('error')
    });
});

app.get('/edashboard', ensureAuthenticated, function(request, response) {
    var eteam = {};
    if(request.user.roleName === properties.roles.manager){
        eteam.id = request.user.teamId;
        eteam.name = request.user.teamName;        
        eteam.username = request.user.username;
        eteam.leadid = request.user.id;
    }
    var userId = request.user.id;

    async.series({
            teams: function(callback) {
                requestProcesser.getExecutiveTeamsAsObj(userId, function(val) {
                    if(request.user.roleName === properties.roles.manager){
                       val.push(eteam);
                    }                    
                    callback(null, val);
                });
            }
        },
        function(err, results) {
            response.render('edashboard.html', {
                user: request.user,
                teams: results.teams,
                message: request.flash('error')
            });
        });

    
    
});

app.get('/ereports', ensureAuthenticated, function(request, response) {
    var eteam = {};
    if(request.user.roleName === properties.roles.manager){
        eteam.id = request.user.teamId;
        eteam.name = request.user.teamName;        
        eteam.username = request.user.username;
        eteam.leadid = request.user.id;
    }
    var userId = request.user.id;

    async.series({
            teams: function(callback) {
                requestProcesser.getExecutiveTeamsAsObj(userId, function(val) {
                    if(request.user.roleName === properties.roles.manager){
                       val.push(eteam);
                    }                    
                    callback(null, val);
                });
            }
        },
        function(err, results) {
            response.render('ereports.html', {
                user: request.user,
                teams: results.teams,
                message: request.flash('error')
            });
        });

    
    
});

app.get('/story', ensureAuthenticated, function(request, response) {
    var userId = request.user.id;
    var teamId = request.user.teamId;

    if (request.user.isLead && !request.user.hasTeam) {
        response.render('story.html', {
            user: request.user,
            projects: [],
            storytypes: [],
            message: request.flash('error')
        });
    } else {        
        async.series({                
                projects: function(callback) {
                    requestProcesser.getTeamProjectsObj(userId, teamId, function(val) {
                        callback(null, val);
                    });
                },
                storytypes: function(callback) {
                    requestProcesser.getStoryTypesObj(userId, function(val) {
                        callback(null, val);
                    });
                }
            },
            function(err, results) {
                response.render('story.html', {
                    user: request.user,
                    projects: results.projects,
                    storytypes: results.storytypes,
                    message: request.flash('error')
                });
            });
    }
});

app.get('/timesheet', ensureAuthenticated, function(request, response) {
    var userId = request.user.id;
    var teamId = request.user.teamId;    
    async.series({
            logstatus: function(callback) {
                requestProcesser.getLogStatusesObj(userId, function(val) {
                    callback(null, val);
                });
            },
            storystatus: function(callback) {
                requestProcesser.getStoryStatusesObj(userId, function(val) {
                    callback(null, val);
                });
            },
            logAccess: function(callback) {
                if(request.user.isLead){
                    val = { accesslevel: 2, userid: userId, teamid: teamId };
                    callback(null, val);
                }else{
                    requestProcesser.hasLogAccessObj(userId, function(val) {
                        callback(null, val);
                    });
                }
            },
            projects: function(callback) {
                requestProcesser.getUserProjectsObj(userId, teamId, function(val) {
                    callback(null, val);
                });
            },
            iterations: function(callback) {
                requestProcesser.getIterationsAsObj(userId, function(val) {
                    callback(null, val);
                });
            },
            teamMembers: function(callback) {
                requestProcesser.getTeamUsersByTeamIdObj(userId, teamId, function(val) {
                    callback(null, val);
                });
            }
        },
        function(err, results) {
            response.render('timesheet.html', {
                user: request.user,
                storystatus: results.storystatus,
                logstatus: results.logstatus,
                projects: results.projects,
                iterations: results.iterations,
                logAccess: results.logAccess,
                teamMembers: results.teamMembers,
                message: request.flash('error')
            });
        });
});

app.get('/usertimesheet', ensureAuthenticated, function(request, response) {
    var teamId = request.user.teamId;
    var selectedUserId = request.param('id');
    var userId = request.user.id;

    async.series({
            selectedUser: function(callback) {
                requestProcesser.getUserByIdObj(selectedUserId, function(val) {
                    callback(null, val);
                });
            },
            teamMembers: function(callback) {
                requestProcesser.getTeamUsersByTeamIdObj(userId, teamId, function(val) {
                    callback(null, val);
                });
            }
        },
        function(err, results) {
            response.render('usertimesheet.html', {
                user: request.user,
                message: request.flash('error'),
                selectedUser: results.selectedUser,
                teamMembers: results.teamMembers
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
    var userId = request.user.id;
    if (selectedUserId) {
        var teamId = request.user.teamId;
        async.series({
                selectedUser: function(callback) {
                    requestProcesser.getUserByIdObj(selectedUserId, function(val) {
                        callback(null, val);
                    });
                },
                teamMembers: function(callback) {
                    requestProcesser.getTeamUsersByTeamIdObj(userId, teamId, function(val) {
                        callback(null, val);
                    });
                }
            },
            function(err, results) {
                response.render('report.html', {
                    user: request.user,
                    message: request.flash('error'),
                    selectedUser: results.selectedUser,
                    teamMembers: results.teamMembers
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

    var userId = request.user.id;

    async.series({
            teams: function(callback) {
                requestProcesser.getTeamsAsObj(userId, function(val) {
                    callback(null, val);
                });
            },
            executives: function(callback) {
                requestProcesser.getExecutivesAsObj(userId, function(val) {
                    callback(null, val);
                });
            },
            roles: function(callback) {
                requestProcesser.getRolesAsObj(function(val) {
                    callback(null, val);
                });
            },
            projects: function(callback) {
                requestProcesser.getAdminProjectsObj(userId, function(val) {
                    callback(null, val);
                });
            },
            iterations: function(callback) {
                requestProcesser.getIterationsAsObj(userId, function(val) {
                    callback(null, val);
                });
            }
        },
        function(err, results) {
            response.render('admin.html', {
                user: request.user,
                executives: results.executives,
                teams: results.teams,
                roles: results.roles,
                projects: results.projects,
                iterations: results.iterations,
                message: request.flash('error')
            });
        });
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
app.get('/getExecutives', ensureAuthenticated, requestProcesser.getExecutives);

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
app.get('/getProjectsByTeamId', ensureAuthenticated, requestProcesser.getProjectsByTeamId);
app.get('/getProject', ensureAuthenticated, requestProcesser.getProject);
app.get('/addMyProject', ensureAuthenticated, requestProcesser.addMyProject);

app.get('/getAdminProjects', ensureAuthenticated, requestProcesser.getAdminProjects);
app.post('/saveAdminProject', ensureAuthenticated, requestProcesser.saveAdminProject);
app.post('/editAdminProject', ensureAuthenticated, requestProcesser.editAdminProject);

app.post('/saveProject', ensureAuthenticated, requestProcesser.saveProject);
app.post('/editProject', ensureAuthenticated, requestProcesser.editProject);
app.post('/removeProject', ensureAuthenticated, requestProcesser.removeProject);

app.post('/saveIteration', ensureAuthenticated, requestProcesser.saveIteration);
app.get('/getIterations', ensureAuthenticated, requestProcesser.getIterations);

app.post('/saveStory', ensureAuthenticated, requestProcesser.saveStory);
app.post('/editStory', ensureAuthenticated, requestProcesser.editStory);
app.post('/removeStory', ensureAuthenticated, requestProcesser.removeStory);
app.get('/getStories', ensureAuthenticated, requestProcesser.getStories);
app.get('/getStoriesNTasks', ensureAuthenticated, requestProcesser.getStoriesNTasks);
app.get('/getStory', ensureAuthenticated, requestProcesser.getStory);

app.post('/saveTask', ensureAuthenticated, requestProcesser.saveTask);
app.post('/editTask', ensureAuthenticated, requestProcesser.editTask);
app.post('/removeTask', ensureAuthenticated, requestProcesser.removeTask);
app.get('/getTasks', ensureAuthenticated, requestProcesser.getTasks);
app.get('/getTask', ensureAuthenticated, requestProcesser.getTask);

app.post('/addResourceToProject', ensureAuthenticated, requestProcesser.addResourceToProject);
app.post('/editResourceOfProject', ensureAuthenticated, requestProcesser.editResourceOfProject);
app.post('/removeResourceFromProject', ensureAuthenticated, requestProcesser.removeResourceFromProject);
app.post('/addNRemoveResourceFromProject', ensureAuthenticated, requestProcesser.addNRemoveResourceFromProject);

app.get('/getMyProjects', ensureAuthenticated, requestProcesser.getMyProjects);
//app.get('/getUserProjects', ensureAuthenticated, requestProcesser.getUserProjects);
app.post('/removeMyProject', ensureAuthenticated, requestProcesser.removeMyProject);

//executive actions
app.get('/getActiveProjectsByTeamId', ensureAuthenticated, requestProcesser.getActiveProjectsByTeamId);

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
app.post('/savePlannedLog', ensureAuthenticated, requestProcesser.savePlannedLog);
app.post('/saveActualLog', ensureAuthenticated, requestProcesser.saveActualLog);
app.post('/editLog', ensureAuthenticated, requestProcesser.editLog);
app.get('/getLogs', ensureAuthenticated, requestProcesser.getLogs);
app.get('/getUserLogs', ensureAuthenticated, requestProcesser.getUserLogs);
app.get('/getLog', ensureAuthenticated, requestProcesser.getLogById);
app.get('/getLogHistoryById', ensureAuthenticated, requestProcesser.getLogHistoryById);

app.get('/getStoryStatuses', ensureAuthenticated, requestProcesser.getStoryStatuses);
app.get('/getLogStatuses', ensureAuthenticated, requestProcesser.getLogStatuses);

app.get('/getUserReportLogs', ensureAuthenticated, requestProcesser.getUserReportLogs);
app.get('/getReportLogs', ensureAuthenticated, requestProcesser.getReportLogs);

app.get('/getDetailedUserReportLogs', ensureAuthenticated, requestProcesser.getDetailedUserReportLogs);
app.get('/getDetailedReportLogs', ensureAuthenticated, requestProcesser.getDetailedReportLogs);

app.get('/getDetailedProjectReportLogs', ensureAuthenticated, requestProcesser.getDetailedProjectReportLogs);

app.get('/getTeamsReportLogs', ensureAuthenticated, requestProcesser.getTeamsReportLogs);


//method to get logs of any team
app.get('/getTeamReport', ensureAuthenticated, function(request, response) {
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
                res.redirect('/edashboard');
            } else {
                res.redirect('/timesheet');
            }
        } else if (restrictedPages(properties.roles.user, req.url) && req.user.roleName === properties.roles.user) {
            res.redirect('/timesheet');
        } else if (restrictedPages(properties.roles.manager, req.url) && req.user.roleName === properties.roles.manager) {
            res.redirect('/dashboard');
        } else if (restrictedPages(properties.roles.admin, req.url) && req.user.roleName === properties.roles.admin) {
            res.redirect('/admin');
        } else if (restrictedPages(properties.roles.seniormanager, req.url) && req.user.roleName === properties.roles.seniormanager) {
            res.redirect('/edashboard');
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
    urls[properties.roles.user] = ['admin', 'dashboard', 'edashboard','ereports'];
    urls[properties.roles.manager] = ['admin'];
    urls[properties.roles.admin] = ['dashboard', 'timesheet', 'report', 'story', 'edashboard','ereports'];
    urls[properties.roles.seniormanager] = ['dashboard', 'timesheet', 'admin', 'story'];
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