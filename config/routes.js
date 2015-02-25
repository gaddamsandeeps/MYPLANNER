var flash = require('connect-flash'),
    async = require("async"),
    controller = require("../app/controllers/controller"),
    properties = require("../properties.json");

exports.init = function(app, passport) {
    console.log('Initializing Routes');

    //pages redirection
    app.get('/dashboard', ensureAuthenticated, controller.dashboard);
    app.get('/edashboard', ensureAuthenticated, controller.edashboard);
    app.get('/ereports', ensureAuthenticated, controller.ereports);
    app.get('/story', ensureAuthenticated, controller.story);
    app.get('/project', ensureAuthenticated, controller.project);
    app.get('/timesheet', ensureAuthenticated, controller.timesheet);
    app.get('/usertimesheet', ensureAuthenticated, controller.usertimesheet);
    app.get('/register', controller.register);
    app.get('/profile', ensureAuthenticated, controller.profile);
    app.get('/forgotpassword', controller.forgotpassword);
    app.get('/report', ensureAuthenticated, controller.report);
    app.get('/', ensureAuthenticated, controller.login);

    app.get('/verify', ensureAuthenticated, controller.verify);
    app.get('/admin', ensureAuthenticated, controller.admin);
    //LOGIN SERVICE
    app.post('/signin',
        passport.authenticate('local', {
            successRedirect: '/loggedIn',
            failureRedirect: '/',
            failureFlash: true
        }));

    app.get('/signout', function(request, response) {
        request.logout();
        request.session = null;
        response.redirect('/');
    });

    //method to get logs of any team
    app.get('/getTeamReport', ensureAuthenticated, controller.getTeamReport);
    //end of pages


    //first login redirection
    app.get('/loggedIn', ensureAuthenticated);

    //****************USER SERVICES***************************//
    app.get('/getExecutives', ensureAuthenticated, controller.getExecutives);

    app.get('/getUser', controller.getUser);
    app.get('/getTeamUsersAndAvailability', ensureAuthenticated, controller.getTeamUsersAndAvailability);
    app.get('/getNonTeamUsers', ensureAuthenticated, controller.getNonTeamUsers);
    app.get('/getLeads', ensureAuthenticated, controller.getLeads);

    app.post('/saveUser', controller.saveUser);
    app.post('/editUser', ensureAuthenticated, controller.editUser);
    app.post('/mapUser', ensureAuthenticated, controller.mapUser);
    app.post('/removeUser', controller.removeUser);
    app.post('/verifyUser', controller.verifyUser);
    app.get('/getUnverifiedUsers', controller.getUnverifiedUsers);

    app.post('/changePassword', ensureAuthenticated, controller.changePassword);
    app.post('/resetPassword', controller.resetPassword);

    app.post('/userExist', controller.userExist);

    //give temp permissions
    app.post('/setPermissions', ensureAuthenticated, controller.setPermissions);
    app.get('/hasLogAccess', ensureAuthenticated, controller.hasLogAccess);
    app.get('/getTeamUsersByTeamId', ensureAuthenticated, controller.getTeamUsersByTeamId);

    //****************PROJECT SERVICES***************************//
    app.get('/getProjectsByTeamId', ensureAuthenticated, controller.getProjectsByTeamId);
    app.get('/getProject', ensureAuthenticated, controller.getProject);
    app.get('/addMyProject', ensureAuthenticated, controller.addMyProject);

    app.get('/getAdminProjects', ensureAuthenticated, controller.getAdminProjects);
    app.post('/saveAdminProject', ensureAuthenticated, controller.saveAdminProject);
    app.post('/editAdminProject', ensureAuthenticated, controller.editAdminProject);

    app.get('/getTProjects', ensureAuthenticated, controller.getTProjects);
    app.get('/getNonTProjects', ensureAuthenticated, controller.getNonTProjects);
    app.post('/giveAccessToProjectsByTeamId', ensureAuthenticated, controller.giveAccessToProjectsByTeamId);
    app.post('/removeAccessToProjectsByTeamId', ensureAuthenticated, controller.removeAccessToProjectsByTeamId);

    app.post('/saveProject', ensureAuthenticated, controller.saveProject);
    app.post('/editProject', ensureAuthenticated, controller.editProject);
    app.post('/removeProject', ensureAuthenticated, controller.removeProject);

    app.post('/addResourceToProject', ensureAuthenticated, controller.addResourceToProject);
    app.post('/editResourceOfProject', ensureAuthenticated, controller.editResourceOfProject);
    app.post('/removeResourceFromProject', ensureAuthenticated, controller.removeResourceFromProject);
    app.post('/addNRemoveResourceFromProject', ensureAuthenticated, controller.addNRemoveResourceFromProject);

    app.get('/getMyProjects', ensureAuthenticated, controller.getMyProjects);
    //app.get('/getUserProjects', ensureAuthenticated, controller.getUserProjects);
    app.post('/removeMyProject', ensureAuthenticated, controller.removeMyProject);

    //executive actions
    app.get('/getActiveProjectsByTeamId', ensureAuthenticated, controller.getActiveProjectsByTeamId);

    //****************ITERATION SERVICES***************************//
    app.post('/saveIteration', ensureAuthenticated, controller.saveIteration);
    app.get('/getIterations', ensureAuthenticated, controller.getIterations);

    //****************STORY SERVICES***************************//
    app.post('/saveStory', ensureAuthenticated, controller.saveStory);
    app.post('/editStory', ensureAuthenticated, controller.editStory);
    app.post('/removeStory', ensureAuthenticated, controller.removeStory);
    app.post('/moveToNextIteration', ensureAuthenticated, controller.moveToNextIteration);

    app.post('/addStoryComment', ensureAuthenticated, controller.addStoryComment);

    app.get('/getStories', ensureAuthenticated, controller.getStories);
    app.get('/getStoriesNTasks', ensureAuthenticated, controller.getStoriesNTasks);
    app.get('/getStoriesNTasksByPidnIterId', ensureAuthenticated, controller.getStoriesNTasksByPidnIterId);
    app.get('/getInCompleteStoriesNTasksByPidnIterId', ensureAuthenticated, controller.getInCompleteStoriesNTasksByPidnIterId);
    app.get('/getStory', ensureAuthenticated, controller.getStory);

    //****************TASK SERVICES***************************//
    app.post('/saveTask', ensureAuthenticated, controller.saveTask);
    app.post('/editTask', ensureAuthenticated, controller.editTask);
    app.post('/changeTaskStatus', ensureAuthenticated, controller.changeTaskStatus);
    app.post('/removeTask', ensureAuthenticated, controller.removeTask);
    app.post('/addTaskComment', ensureAuthenticated, controller.addTaskComment);

    app.get('/getTasks', ensureAuthenticated, controller.getTasks);
    app.get('/getInCompleteTasks', ensureAuthenticated, controller.getInCompleteTasks);
    app.get('/getTask', ensureAuthenticated, controller.getTask);


    //****************TEAM SERVICES***************************//
    app.post('/saveTeam', ensureAuthenticated, controller.saveTeam);
    app.post('/editTeam', ensureAuthenticated, controller.editTeam);
    app.post('/removeTeam', ensureAuthenticated, controller.removeTeam);
    app.get('/getTeams', controller.getTeams);


    //****************ROLE SERVICES***************************//
    app.post('/saveRole', ensureAuthenticated, controller.saveRole);
    app.post('/editRole', ensureAuthenticated, controller.editRole);
    app.post('/removeRole', ensureAuthenticated, controller.removeRole);
    app.get('/getRoles', controller.getRoles);

    //****************LOG SERVICES***************************//
    app.post('/savePlannedLog', ensureAuthenticated, controller.savePlannedLog);
    app.post('/saveActualLog', ensureAuthenticated, controller.saveActualLog);
    app.post('/editLog', ensureAuthenticated, controller.editLog);
    app.get('/getLogs', ensureAuthenticated, controller.getLogs);
    app.get('/getUserLogs', ensureAuthenticated, controller.getUserLogs);
    app.get('/getLog', ensureAuthenticated, controller.getLogById);
    app.get('/getLogHistoryById', ensureAuthenticated, controller.getLogHistoryById);

    app.get('/getStoryStatuses', ensureAuthenticated, controller.getStoryStatuses);
    app.get('/getLogStatuses', ensureAuthenticated, controller.getLogStatuses);

    app.get('/getUserReportLogs', ensureAuthenticated, controller.getUserReportLogs);
    app.get('/getReportLogs', ensureAuthenticated, controller.getReportLogs);

    app.get('/getDetailedUserReportLogs', ensureAuthenticated, controller.getDetailedUserReportLogs);
    app.get('/getDetailedReportLogs', ensureAuthenticated, controller.getDetailedReportLogs);

    app.get('/getDetailedProjectReportLogs', ensureAuthenticated, controller.getDetailedProjectReportLogs);

    app.get('/getTeamsReportLogs', ensureAuthenticated, controller.getTeamsReportLogs);

    app.get('/unlockLog', ensureAuthenticated, controller.unlockLog);
    app.get('/unlockLogRequest', ensureAuthenticated, controller.unlockLogRequest);


};

//************Authentication*******************************//
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.url !== '/verify' && req.url !== '/profile' && req.url !== '/editUser' && !req.user.verified && (req.user.roleId !== properties.roles.user)) {
            res.redirect('/verify');
        }
        if (req.url === '/loggedIn' || req.url === '/') {
            if (req.user.roleId === properties.roles.manager) {
                res.redirect('/dashboard');
            } else if (req.user.roleId === properties.roles.admin) {
                res.redirect('/admin');
            } else if (req.user.roleId === properties.roles.seniormanager) {
                res.redirect('/edashboard');
            } else {
                res.redirect('/timesheet');
            }
        } else if (restrictedPages(properties.roles.user, req.url) && req.user.roleId === properties.roles.user) {
            res.redirect('/timesheet');
        } else if (restrictedPages(properties.roles.manager, req.url) && req.user.roleId === properties.roles.manager) {
            res.redirect('/dashboard');
        } else if (restrictedPages(properties.roles.admin, req.url) && req.user.roleId === properties.roles.admin) {
            res.redirect('/admin');
        } else if (restrictedPages(properties.roles.seniormanager, req.url) && req.user.roleId === properties.roles.seniormanager) {
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

//************Authorization*******************************//
function restrictedPages(key, reqUrl) {
    var urls = {};
    urls[properties.roles.user] = ['admin', 'dashboard', 'edashboard', 'ereports', 'project'];
    urls[properties.roles.manager] = ['admin', 'edashboard'];
    urls[properties.roles.admin] = ['dashboard', 'timesheet', 'report', 'story', 'edashboard', 'ereports', 'project'];
    urls[properties.roles.seniormanager] = ['dashboard', 'timesheet', 'admin', 'story', 'project'];
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
