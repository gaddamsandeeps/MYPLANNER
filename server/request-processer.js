/**
 * request processor - Helper class
 */
var defaultUtil = require('util'),
    log = require('../app/logger/logger').logger("request-processor"),
    properties = require("../properties.json"),
    userService = require("../app/services/user-service"),
    logService = require("../app/services/log-service"),
    projectService = require("../app/services/project-service"),
    iterationService = require("../app/services/iteration-service"),
    storyService = require("../app/services/story-service"),
    taskService = require("../app/services/task-service"),
    teamService = require("../app/services/team-service"),
    teamResourceService = require("../app/services/team-resource-service"),
    roleService = require("../app/services/role-service"),
    encrypt = require("../app/util/encrypt"),
    util = require("../app/util/util"),
    mailer = require("../app/util/mailer"),
    mailerMessages = require("../mailer-messages.json"),
    startTime = ' 00:00:00',
    endTime = ' 23:59:59';

exports.auth = function(name, pwd, callback) {
    log.debug("auth : name is " + name);
    try {
        userService.auth([name, encrypt.encrypt(pwd)], callback);
    } catch (e) {
        log.error("Error : " + e);
        callback([]);
    }
};

exports.getRoleByUserNameObj = function(userName, callback) {
    log.debug("getRoleByUserNameObj : userName is " + userName);
    roleService.getRoleByUserName(userName, callback);
};

exports.getTeamByLeadIdObj = function(userId, callback) {
    log.debug("getTeamByLeadIdObj : userId is " + userId);
    teamService.getTeamByLeadId(userId, callback);
};

exports.getTeamByUserId = function(userId, callback) {
    log.debug("getTeamByUserId : userId is " + userId);
    teamService.getTeamByUserId(userId, callback);
};

exports.getUsersAvailabilityTeamId = function(request, response, callback) {
    log.debug("getUsersAvailabilityTeamId : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    userService.getUsersAvailabilityTeamId([teamId, startTime, endTime], callback);
};

exports.getUser = function(request, response, callback) {
    log.debug("getUser : logged in user is " + (request.user.id));
    var userId = request.param(properties.user.userId);
    userService.getUser(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserByIdObj = function(userId, callback) {
    log.debug("getUserById");
    userService.getUserById(userId, callback);
};

exports.getExecutivesAsObj = function(userId, callback) {
    log.debug("getExecutivesAsObj : logged in user is " + (userId));
    userService.getExecutives(callback);
};

exports.getExecutives = function(request, response) {
    log.debug("getExecutives : logged in user is " + (request.user.id));

    userService.getExecutives(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsersAndAvailability = function(request, response, callback) {
    log.debug("getTeamUsersAndAvailability : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    userService.getTeamUsersAndAvailability([teamId, startTime, endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsersByTeamId = function(request, response, callback) {
    log.debug("getTeamUsersByTeamId : logged in user is " + (request.user.id));
    var teamId = request.param(properties.team.id);
    userService.getTeamUsersByTeamId(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsersByTeamIdObj = function(userId, teamId, callback) {
    log.debug("getTeamUsersByTeamIdObj : logged in user is " + (userId));
    userService.getTeamUsersByTeamId(teamId, callback);
};

exports.getNonTeamUsers = function(request, response, callback) {
    log.debug("getNonTeamUsers : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    userService.getNonTeamUsers(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLeads = function(request, response, callback) {
    log.debug("getLeads : logged in user is " + (request.user.id));
    userService.getLeads(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeams = function(request, response, callback) {
    log.debug("getTeams");
    teamService.getTeams(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamsAsObj = function(userId, callback) {
    log.debug("getTeamsAsObj : logged in user is " + (userId));
    teamService.getTeams(callback);
};

exports.getExecutiveTeamsAsObj = function(userId, callback) {
    log.debug("getExecutiveTeamsAsObj : logged in user is " + (userId));
    teamService.getExecutiveTeams(userId, callback);
};

exports.getTeamByLeadId = function(userId, request, response, callback) {
    log.debug("getTeamByLeadId : logged in user is " + (request.user.id));
    module.exports.getTeamByLeadId(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getProjectsByTeamId = function(request, response) {
    log.debug("getProjectsByTeamId : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.user.teamId;
    projectService.getProjectsByTeamId([userId, teamId, startTime, endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getAdminProjects = function(request, response) {
    log.debug("getAdminProjects : logged in user is " + (request.user.id));
    var userId = request.user.id;
    projectService.getAdminProjects([userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getAdminProjectsObj = function(userId, callback) {
    log.debug("getAdminProjectsObj : logged in user is " + (userId));
    projectService.getAdminProjects([userId], callback);
};

exports.getTProjects = function(request, response) {
    log.debug("getTProjects : logged in user is " + (request.user.id));
    var userId = request.user.id;
    projectService.getTProjects([userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTProjectsAsObj = function(userId, callback) {
    log.debug("getTProjects : logged in user is " + (userId));

    projectService.getTProjects([userId], callback);
};

exports.getNonTProjects = function(request, response) {
    log.debug("getNonTProjects : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.user.teamId;

    projectService.getNonTProjects([teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getNonTProjectsAsObj = function(userId, teamId, callback) {
    log.debug("getNonTProjectsAsObj : logged in user is " + (userId));

    projectService.getNonTProjects([teamId], callback);
};



exports.giveAccessToProjectsByTeamId = function(request, response) {
    log.debug("giveAccessToProjectsByTeamId : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var pid = request.param(properties.project.id);
    var teamId = request.user.teamId;

    projectService.giveAccessToProjectsByTeamId([pid, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeAccessToProjectsByTeamId = function(request, response) {
    log.debug("removeAccessToProjectsByTeamId : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var pid = request.param(properties.project.id);
    var teamId = request.param(properties.team.teamId);

    projectService.removeAccessToProjectsByTeamId([pid, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveAdminProject = function(request, response, callback) {
    var userId = request.user.id;
    log.debug("saveAdminProject : logged in user is " + userId);

    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);
    projectService.saveAdminProject([name, desc, strtDte, endDte, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editAdminProject = function(request, response, callback) {
    var userId = request.user.id;
    log.debug("editAdminProject : logged in user is " + userId);


    var id = request.param(properties.project.id);
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);
    projectService.editAdminProject([userId, name, desc, strtDte, endDte, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserMappedProjectCountByTeamId = function(request, response, callback) {
    log.debug("getUserMappedProjectCountByTeamId : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    projectService.getUserMappedProjectCountByTeamId(teamId, callback);
};

exports.getMyProjects = function(request, response) {
    log.debug("getMyProjects : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    projectService.getMyProjects(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getActiveProjectsByTeamId = function(request, response) {
    log.debug("getActiveProjectsByTeamId : logged in user is " + (request.user.id));
    var teamId = request.param(properties.team.teamId);
    projectService.getActiveProjectsByTeamId(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamProjectsObj = function(userId, teamId, callback) {
    log.debug("getTeamProjects : logged in user is " + (userId));
    projectService.getTeamProjectsByTeamId(teamId, callback);
};

exports.getUserProjectsObj = function(userId, teamId, callback) {
    log.debug("getUserProjectsObj : logged in user is " + (userId));
    projectService.getUserProjects(teamId, callback);
};

exports.removeMyProject = function(request, response) {
    log.debug("removeMyProject : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var projectId = request.param(properties.project.id);
    projectService.removeMyProject([userId, projectId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getRoles = function(request, response) {
    log.debug("getRoles");
    roleService.getRoles(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getRolesAsObj = function(callback) {
    log.debug("getRolesAsObj");
    roleService.getRoles(callback);
};

exports.saveUser = function(request, response, callback) {
    log.debug("saveUser");
    var uName = request.param(properties.user.userName);
    var pwd = request.param(properties.user.password);
    var teamId = request.param(properties.user.teamId);
    var roleId = request.param(properties.user.roleId);
    var firstName = request.param(properties.user.firstName);
    var lastName = request.param(properties.user.lastName);
    var contact = request.param(properties.user.contact);
    userService.saveUser([uName, encrypt.encrypt(pwd), roleId, firstName, lastName, contact, (teamId === '' ? '0' : teamId)], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeUser = function(request, response, callback) {
    log.debug("removeUser" + (request.user.id));
    var uid = request.param(properties.user.id);

    userService.removeUser(uid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.verifyUser = function(request, response, callback) {
    log.debug("verifyUser" + (request.user.id));
    var uid = request.param(properties.user.id);

    userService.verifyUser(uid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUnverifiedUsers = function(request, response, callback) {
    log.debug("getUnverifiedUsers" + (request.user.id));

    userService.getUnverifiedUsers(function(returnValue) {
        response.json(returnValue);
    });
};

exports.userExist = function(request, response, callback) {
    log.debug("userExist");
    var uName = request.param(properties.user.userName);

    userService.userExist(uName, function(returnValue) {
        response.json(returnValue);
    });
};

exports.editUser = function(request, response, callback) {
    log.debug("editUser : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.param(properties.user.teamId);
    var roleId = request.param(properties.user.roleId);
    var firstName = request.param(properties.user.firstName);
    var lastName = request.param(properties.user.lastName);
    var contact = request.param(properties.user.contact);
    userService.editUser([userId, roleId, firstName, lastName, contact, (teamId === '' ? '0' : teamId)], function(returnValue) {
        if (returnValue.message === 'success') {
            request.user.firstname = firstName;
            request.user.lastname = lastName;
            request.logout();
            response.json(returnValue);
        }
    });
};

exports.changePassword = function(request, response, callback) {
    log.debug("changePassword : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var userName = request.user.username;
    var oldPwd = request.param(properties.user.oldPassword);
    var newPwd = request.param(properties.user.newPassword);
    userService.auth([userName, encrypt.encrypt(oldPwd)], function(res) {
        if (!res) {
            response.json(util.emptyFailureErrObj());
        } else {
            userService.editPassword([encrypt.encrypt(newPwd), userName], function(returnValue) {
                request.logout();
                response.json(returnValue);
            });
        }
    });
};

exports.resetPassword = function(request, response, callback) {
    log.debug("resetPassword");
    var pwd = request.param(properties.user.password);
    var contact = request.param(properties.user.contact);
    var username = request.param(properties.user.userName);
    userService.contactExist([username, contact], function(res) {
        if (res.length == 0) {
            response.json(util.emptyFailureErrObj());
        } else {
            userService.editPassword([encrypt.encrypt(pwd), username], function(returnValue) {
                response.json(returnValue);
            });
        }
    });
};

exports.mapUser = function(request, response, callback) {
    log.debug("mapUser : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;
    var userId = request.param(properties.team.userId);
    var description = request.param(properties.team.desc);
    teamResourceService.mapUser([teamId, userId, description], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveTeam = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("saveTeam : logged in user is " + (userId));
    var name = request.param(properties.team.name);
    var desc = request.param(properties.team.desc);
    var leadId = request.param(properties.team.leadId);

    var executives = request.param(properties.team.executives);

    teamService.saveTeam([name, desc, leadId, userId], executives, function(returnValue) {
        response.json(returnValue);
    });
};

exports.editTeam = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("editTeam : logged in user is " + (userId));
    var id = request.param(properties.team.id);
    var name = request.param(properties.team.name);
    var desc = request.param(properties.team.desc);
    var leadId = request.param(properties.team.leadId);

    var executives = request.param(properties.team.executives);

    teamService.editTeam([name, desc, leadId, userId, id], executives, function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeTeam = function(request, response, callback) {
    log.debug("removeTeam : logged in user is " + (request.user.id));
    var teamId = request.param(properties.team.id);
    teamService.removeTeam(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveProject = function(request, response, callback) {
    log.debug("saveProject : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.user.teamId;
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);
    projectService.saveProject([name, desc, strtDte, endDte, userId, teamId], teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.editProject = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("editProject : logged in user is " + userId);
    var id = request.param(properties.project.id);
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);
    projectService.editProject([userId, name, desc, strtDte, endDte, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeProject = function(request, response, callback) {
    log.debug("removeProject : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var id = request.param(properties.project.id);
    var teamId = request.user.teamId;
    projectService.removeProject([id, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveIteration = function(request, response, callback) {
    log.debug("saveIteration : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var name = request.param(properties.iteration.name);
    var desc = request.param(properties.iteration.desc);
    var strtDte = request.param(properties.iteration.startDate);
    var endDte = request.param(properties.iteration.endDate);

    iterationService.saveIteration([name, desc, strtDte, endDte, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getIterations = function(request, response, callback) {
    log.debug("getIterations : logged in user is " + (request.user.id));
    var userId = request.user.id;
    iterationService.getIterations(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getIterationsAsObj = function(userId, callback) {
    log.debug("getIterationsAsObj : logged in user is " + (userId));
    iterationService.getIterations(callback);
};

exports.saveStory = function(request, response, callback) {
    log.debug("saveStory : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var name = request.param(properties.story.name);
    var iterationid = request.param(properties.iteration.iterationid);
    var projectId = request.param(properties.story.projectId);
    var desc = request.param(properties.story.desc);
    var hrs = request.param(properties.story.hrs);
    var type = request.param(properties.story.type);
    var status = request.param(properties.story.status);

    storyService.saveStory([name, iterationid, projectId, desc, hrs, type, type, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editStory = function(request, response, callback) {
    log.debug("editStory : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var id = request.param(properties.story.id);
    var name = request.param(properties.story.name);
    //var iterationid = request.param(properties.iteration.iterationid);
    //var projectId = request.param(properties.story.projectId);
    var desc = request.param(properties.story.desc);
    var hrs = request.param(properties.story.hrs);
    var status = request.param(properties.story.status);

    storyService.editStory([name, desc, hrs, status, userId, id], id, function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeStory = function(request, response, callback) {
    log.debug("removeStory : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var sid = request.param(properties.story.id);
    storyService.removeStory([sid, userId], sid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.moveToNextIteration = function(request, response, callback) {
    log.debug("moveToNextIteration : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var sid = request.param(properties.story.id);
    var iterid = request.param(properties.iteration.iterationid);

    storyService.moveToNextIteration([userId, iterid, sid], function(returnValue) {
        response.json(returnValue);
    });
};

exports.addStoryComment = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("addStoryComment : logged in user is " + userId);

    var sid = request.param(properties.story.id);
    var description = request.param(properties.story.desc);
    storyService.addStoryComment([sid, userId, description], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStories = function(request, response, callback) {
    log.debug("getStories : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var projectId = request.param(properties.story.projectId);
    storyService.getStories(projectId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStoriesNTasks = function(request, response, callback) {
    log.debug("getStoriesNTasks : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var projectId = request.param(properties.story.projectId);
    storyService.getStoriesNTasks(projectId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStoriesNTasksByPidnIterId = function(request, response, callback) {
    log.debug("getStoriesNTasksByPidnIterId : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var projectId = request.param(properties.story.projectId);
    var iterationId = request.param(properties.iteration.iterationid);

    storyService.getStoriesNTasksByPidnIterId([projectId, iterationId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getInCompleteStoriesNTasksByPidnIterId = function(request, response, callback) {
    log.debug("getInCompleteStoriesNTasksByPidnIterId : logged in user is " + (request.user.id));
    var userId = request.user.id;

    var projectId = request.param(properties.story.projectId);
    var iterationId = request.param(properties.iteration.iterationid);

    storyService.getInCompleteStoriesNTasksByPidnIterId([projectId, iterationId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStory = function(request, response, callback) {
    log.debug("getStory : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var sid = request.param(properties.story.id);
    storyService.getStory(sid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStoryTypesObj = function(userId, callback) {
    log.debug("getStoryTypesObj : logged in user is " + (userId));
    storyService.getStoryTypesObj(callback);
};

exports.saveTask = function(request, response, callback) {
    log.debug("saveTask : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var name = request.param(properties.task.name);
    var storyId = request.param(properties.task.storyId);
    var desc = request.param(properties.task.desc);
    var hrs = request.param(properties.task.hrs);

    taskService.saveTask([name, storyId, desc, hrs, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editTask = function(request, response, callback) {
    log.debug("editTask : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var id = request.param(properties.task.id);
    var name = request.param(properties.task.name);
    var desc = request.param(properties.task.desc);
    var hrs = request.param(properties.task.hrs);
    var prevHrs = request.param(properties.task.prevHrs);
    var storyId = request.param(properties.task.storyId);

    taskService.editTask([name, desc, hrs, userId, id, prevHrs, storyId], id, function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeTask = function(request, response, callback) {
    log.debug("removeTask : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var tid = request.param(properties.task.id);
    taskService.removeTask([tid, userId], tid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.changeTaskStatus = function(request, response, callback) {
    log.debug("changeTaskStatus : logged in user is " + (request.user.id));
    var userId = request.user.id;

    var tid = request.param(properties.task.id);
    var stateId = request.param(properties.task.stateId);
    var type = request.param(properties.story.type);

    taskService.changeTaskStatus([userId, stateId, tid], type, function(returnValue) {
        response.json(returnValue);
    });
};

exports.addTaskComment = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("addTaskComment : logged in user is " + userId);

    var tid = request.param(properties.task.id);
    var description = request.param(properties.task.desc);
    storyService.addTaskComment([tid, userId, description], sid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTasks = function(request, response, callback) {
    log.debug("getTasks : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var storyId = request.param(properties.task.storyId);
    taskService.getTasks(storyId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTaskStatusesAsObj = function(userId, callback) {
    log.debug("getTaskStatuses : logged in user is " + (userId));

    taskService.getTaskStatuses(callback);
};

exports.getInCompleteTasks = function(request, response, callback) {
    log.debug("getInCompleteTasks : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var storyId = request.param(properties.task.storyId);
    taskService.getInCompleteTasks(storyId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTask = function(request, response, callback) {
    log.debug("getTask : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var tid = request.param(properties.task.id);
    taskService.getTask(tid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveRole = function(request, response, callback) {
    log.debug("saveRole : logged in user is " + (request.user.id));
    var name = request.param(properties.role.name);
    var desc = request.param(properties.role.desc);
    roleService.saveRole([name, desc], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editRole = function(request, response, callback) {
    log.debug("editRole : logged in user is " + (request.user.id));
    var roleId = request.param(properties.role.id);
    var name = request.param(properties.role.name);
    var desc = request.param(properties.role.desc);
    roleService.editRole([name, desc, roleId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeRole = function(request, response, callback) {
    log.debug("removeRole : logged in user is " + (request.user.id));
    var roleId = request.param(properties.role.id);
    roleService.removeRole(roleId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.addMyProject = function(request, response, callback) {
    log.debug("addMyProject : logged in user is " + (request.user.id));
    var pid = request.param(properties.project.id);
    var userId = request.user.id;
    var teamId = request.user.teamId;
    projectService.addMyProject([pid, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getProject = function(request, response, callback) {
    log.debug("getProject : logged in user is " + (request.user.id));
    var pid = request.param(properties.project.id);
    projectService.getProject(pid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.addResourceToProject = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("addResourceToProject : logged in user is " + userId);

    var teamId = request.user.teamId;
    var pid = request.param(properties.project.id);
    var uid = request.param(properties.project.userId);
    var startDate = request.param(properties.project.sowstartdate);
    var endDate = request.param(properties.project.sowenddate);
    var description = request.param(properties.project.sowprojectdescription);
    var billable = request.param(properties.project.billable);
    var sowNo = request.param(properties.project.sowNo);

    sowNo = (billable == 0) ? "NA" : sowNo;

    var projectname = request.param(properties.project.projectname);

    projectService.addResourceToProject([pid, uid, startDate, endDate, description, billable, sowNo, userId], function(returnValue) {
        userService.getUserById(uid, function(val) {
            var body = (defaultUtil.format(mailerMessages.add_resource.text, val.firstname + ' ' + val.lastname, projectname));
            mailer.sendMail(val.username, request.user.username, mailerMessages.add_resource.subject, body);
        });
        response.json(returnValue);
    });
};

exports.editResourceOfProject = function(request, response, callback) {
    var userId = request.user.id;

    log.debug("editResourceOfProject : logged in user is " + userId);

    var teamId = request.user.teamId;
    var pid = request.param(properties.project.id);
    var projectResourceId = request.param(properties.project.projectResourceId);
    var uid = request.param(properties.project.userId);
    var startDate = request.param(properties.project.sowstartdate);
    var endDate = request.param(properties.project.sowenddate);
    var description = request.param(properties.project.sowprojectdescription);
    var billable = request.param(properties.project.billable);
    var sowNo = request.param(properties.project.sowNo);

    sowNo = (billable == 0) ? "NA" : sowNo;

    var projectname = request.param(properties.project.projectname);

    projectService.editResourceOfProject([pid, uid, startDate, endDate, description, billable, sowNo, userId], projectResourceId, function(returnValue) {

        userService.getUserById(uid, function(val) {
            var body = (defaultUtil.format(mailerMessages.add_resource.text, val.firstname + ' ' + val.lastname, projectname));
            mailer.sendMail(val.username, request.user.username, mailerMessages.add_resource.subject, body);
        });
        response.json(returnValue);
    });
};

exports.removeResourceFromProject = function(request, response, callback) {
    log.debug("removeResourceFromProject : logged in user is " + (request.user.id));
    var pid = request.param(properties.project.id);
    var prid = request.param(properties.project.projectResourceId);
    var uid = request.param(properties.project.userId);
    var projectname = request.param(properties.project.projectname);

    projectService.removeResourceFromProject(prid, function(returnValue) {
        userService.getUserById(uid, function(val) {
            var body = (defaultUtil.format(mailerMessages.removed_resource.text, val.firstname + ' ' + val.lastname, projectname));
            mailer.sendMail(val.username, request.user.username, mailerMessages.removed_resource.subject, body);
        });
        response.json(returnValue);
    });
};

exports.addNRemoveResourceFromProject = function(request, response, callback) {
    log.debug("addNRemoveResourceFromProject : logged in user is " + (request.user.id));
    var removePid = request.param(properties.project.removePid);
    var updatePid = request.param(properties.project.updatePid);
    var uid = request.param(properties.project.userId);
    projectService.addNRemoveResourceFromProject([updatePid, removePid, uid], function(returnValue) {
        response.json(returnValue);
    });
};

exports.savePlannedLog = function(request, response, callback) {
    log.debug("savePlannedLog : logged in user is " + (request.user.id));
    var userId = request.body.userid || request.user.id;
    var loggedUserId = request.user.id;
    var teamId = request.user.teamId;
    var projectId = request.param(properties.logs.projectId);
    var iterationNo = request.param(properties.logs.iterationno);
    var story = request.param(properties.logs.story);
    var task = request.param(properties.logs.task);
    var storyStatus = request.param(properties.logs.storyStatus);
    var plannedStartDate = request.param(properties.logs.plannedStartDate);
    var plannedEndDate = request.param(properties.logs.plannedEndDate);
    var desc = request.param(properties.logs.desc);
    var status = request.param(properties.logs.status);
    storyStatus = (storyStatus == '' ? null : storyStatus);
    iterationNo = (iterationNo == '' ? null : iterationNo);
    story = (story == '' ? null : story);
    task = (task == '' ? null : task);
    logService.savePlannedLog([projectId, teamId, iterationNo, story, task, storyStatus, plannedStartDate, plannedEndDate, userId, loggedUserId, desc, status], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveActualLog = function(request, response, callback) {
    log.debug("saveActualLog : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var id = request.param(properties.logs.id);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);
    var status = request.param(properties.logs.status);
    logService.saveActualLog([startDate, endDate, desc, status, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editLog = function(request, response, callback) {
    log.debug("editLog : logged in user is " + (request.user.id));
    var loggedUserId = request.user.id;
    var id = request.param(properties.logs.id);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);
    var status = request.param(properties.logs.status);
    logService.editLog([startDate, endDate, desc, status, id], id, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogs = function(request, response, callback) {
    log.debug("getLogs : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    logService.getLogsByUserId([startDate + startTime, endDate + endTime, startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStoryStatuses = function(request, response, callback) {
    log.debug("getStoryStatuses : logged in user is " + (request.user.id));
    logService.getStoryStatuses(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getStoryStatusesObj = function(userId, callback) {
    log.debug("getStoryStatusesObj : logged in user is " + (userId));
    logService.getStoryStatuses(callback);
};

exports.getLogStatuses = function(request, response, callback) {
    log.debug("getLogStatuses : logged in user is " + (request.user.id));
    logService.getLogStatuses(function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogStatusesObj = function(userId, callback) {
    log.debug("getLogStatusesObj : logged in user is " + (userId));
    logService.getLogStatuses(callback);
};

exports.getUserReportLogs = function(request, response, callback) {
    log.debug("getUserReportLogs : logged in user is " + (request.user.id));
    var userId = request.param(properties.team.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    logService.getUserReportLogs([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getReportLogs = function(request, response, callback) {
    log.debug("getReportLogs : logged in user is " + (request.user.id));
    var userId = request.user.id;
    //var projectId = request.param(properties.project.id);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    logService.getReportLogs([startDate + startTime, endDate + endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamsReportLogs = function(request, response, callback) {
    log.debug("getTeamsReportLogs : logged in user is " + (request.user.id));

    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    var teamIds = request.param(properties.team.executives);

    logService.getTeamsReportLogs([startDate + startTime, endDate + endTime, teamIds], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getDetailedUserReportLogs = function(request, response, callback) {
    log.debug("getDetailedUserReportLogs : logged in user is " + (request.user.id));
    var userId = request.param(properties.team.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    logService.getDetailedUserReportLogs([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getDetailedReportLogs = function(request, response, callback) {
    log.debug("getDetailedReportLogs : logged in user is " + (request.user.id));
    var userId = request.user.id;
    //var projectId = request.param(properties.project.id);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var teamId = request.user.teamId;
    logService.getDetailedReportLogs([startDate + startTime, endDate + endTime, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getDetailedProjectReportLogs = function(request, response, callback) {
    log.debug("getDetailedProjectReportLogs : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var projectId = request.param(properties.project.id);

    var teamId = request.param(properties.team.teamId);

    projectService.getDetailedProjectReportLogs([projectId, teamId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.unlockLog = function(request, response, callback) {
    log.debug("unlockLog : logged in user is " + (request.user.id));
    var logId = request.param(properties.logs.id);
    var userId = request.param(properties.user.userId);
    var startDate = request.param(properties.logs.startDate);
    var status = request.param(properties.logs.status);
    logService.unlockLog([status, userId, logId], function(returnValue) {
        logService.getUserDetailsByLogid(logId, function(val) {
            var body = (defaultUtil.format(mailerMessages.unlock_log.text, request.user.firstname + ' ' + request.user.lastname, util.formatDate(startDate)));
            mailer.sendMail(val.username, request.user.username, mailerMessages.unlock_log.subject, body);
        });
        response.json(returnValue);
    });
};

exports.unlockLogRequest = function(request, response, callback) {
    log.debug("unlockLogRequest : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var logId = request.param(properties.logs.id);
    var startDate = request.param(properties.logs.startDate);
    var status = request.param(properties.logs.status);
    logService.unlockLogRequest([status, userId, logId], function(returnValue) {
        teamService.getTeamLeadDetailsByUserId(userId, function(val) {
            var body = (defaultUtil.format(mailerMessages.unlock_request.text, request.user.firstname + ' ' + request.user.lastname, util.formatDate(startDate)));
            mailer.sendMail(val.username, request.user.username, mailerMessages.unlock_request.subject, body);
        });
        response.json(returnValue);
    });
};

exports.getUserLogs = function(request, response, callback) {
    log.debug("getUserLogs : logged in user is " + (request.user.id));
    var userId = request.param(properties.user.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    logService.getLogsByUserId([startDate + startTime, endDate + endTime, startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogById = function(request, response, callback) {
    log.debug("getLogById : logged in user is " + (request.user.id));
    var logId = request.param(properties.logs.id);
    logService.getLog(logId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogHistoryById = function(request, response, callback) {
    log.debug("getLogHistoryById : logged in user is " + (request.user.id));
    var logId = request.param(properties.logs.id);
    logService.getLogHistoryById(logId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.setPermissions = function(request, response) {
    log.debug("setPermissions : logged in user is " + (request.user.id));
    var accessLevel = request.body.accesslevel;
    var userId = request.body.id;
    var permissionsObj = [];
    permissionsObj.push(accessLevel, userId);
    teamService.setPermissions(permissionsObj, function(returnValue) {
        response.json(returnValue);
    });
};

exports.hasLogAccess = function(request, response) {
    log.debug("hasLogAccess : logged in user is " + (request.user.id));
    var userId = request.user.id;
    teamService.hasLogAccess(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.hasLogAccessObj = function(userId, callback) {
    log.debug("hasLogAccessObj : logged in user is " + (userId));
    teamService.hasLogAccess(userId, callback);
};

exports.getTeamMembersByRole = function(request, response) {
    log.debug("getTeamMembersByRole : logged in user is " + (request.user.id));
    var roleId = request.query.roleId;
    teamService.getTeamMembersByRole(roleId, function(returnValue) {
        response.json(returnValue);
    });
};
