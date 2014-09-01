/**
 * request processor - Helper class
 */
var log = require('../app/logger/logger').logger("request-processor"),
    properties = require("../properties.json"),
    userService = require("../app/services/user-service"),
    logService = require("../app/services/log-service"),
    projectService = require("../app/services/project-service"),
    teamService = require("../app/services/team-service"),
    teamResourceService = require("../app/services/team-resource-service"),
    roleService = require("../app/services/role-service"),
    encrypt = require("../app/util/encrypt"),
    startTime = ' 00:00:00',
    endTime = ' 23:59:59';


exports.auth = function(name, pwd, callback) {
    log.debug("auth");
    try {
        userService.auth([name, encrypt.encrypt(pwd)], function(returnValue) {
            callback(returnValue)
        });
    } catch (e) {
        log.error("Error : " + e);
        callback([]);
    }
};

exports.getRoleByUserName = function(userName, callback) {
    log.debug("getRoleByUserName");
    roleService.getRoleByUserName(userName, function(returnValue) {
        callback(returnValue)
    });
};

exports.getTeamByUserId = function(userId, callback) {
    log.debug("getTeamByUserName");
    teamService.getTeam(userId, function(returnValue) {
        callback(returnValue);
    });
};

exports.getUsersAvailabilityTeamId = function(request, response, callback) {
    log.debug("getUsersAvailabilityTeamId");

    var teamId = request.user.teamId;
    userService.getUsersAvailabilityTeamId([teamId, startTime, endTime], callback);
};

exports.getUser = function(request, response, callback) {
    log.debug("getUser");
    var userId = request.param(properties.user.userId);

    userService.getUser(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserById = function(userId, callback) {
    log.debug("getUserById");
    userService.getUserById(userId, function(returnValue) {
        callback(returnValue);
    });
};

exports.getTeamUsersAndAvailability = function(request, response, callback) {
    log.debug("getTeamUsers");
    var teamId = request.user.teamId;

    userService.getTeamUsersAndAvailability([teamId, startTime, endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsers = function(request, response, callback) {
    log.debug("getTeamUsers");

    var teamId = request.user.teamId;
    userService.getTeamUsers(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getNonTeamUsers = function(request, response, callback) {
    log.debug("getNonTeamUsers");
    var teamId = request.user.teamId;
    userService.getNonTeamUsers(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLeads = function(request, response, callback) {
    log.debug("getLeads");
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

exports.getTeamsAsObj = function(request, response, callback) {
    log.debug("getTeamsAsObj");
    teamService.getTeams(function(returnValue) {
        callback(returnValue);
    });
};

exports.getTeam = function(userId, request, response, callback) {
    log.debug("getTeam");
    module.exports.getTeamByUserId(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getProjects = function(request, response) {
    log.debug("getProjects");
    var userId = request.user.id;
	var teamId = request.user.teamId;
    projectService.getProjects([userId, teamId,  startTime, endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserMappedProjectCountByTeamId = function(request, response, callback) {
    log.debug("getUserMappedProjectCount");
    var teamId = request.user.teamId;
    projectService.getUserMappedProjectCountByTeamId(teamId, callback);
};

exports.getMyProjects = function(request, response) {
    log.debug("getMyProjects");
    var userId = request.user.id;
    projectService.getMyProjects(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserProjects = function(request, response) {
    log.debug("getUserProjects");
    var userId = request.user.id;
    projectService.getUserProjects(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeMyProject = function(request, response) {
    log.debug("removeMyProject");
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

exports.getRolesAsObj = function(request, response, callback) {
    log.debug("getRolesAsObj");
    roleService.getRoles(function(returnValue) {
        callback(returnValue);
    });
};

exports.saveUser = function(request, response, callback) {
    log.debug("saveUser");
    var uName = request.param(properties.user.userName);
    var pwd = request.param(properties.user.password);
    var teamId = request.param(properties.user.teamId);
    var roleId = request.param(properties.user.roleId);
    var firstName = request.param(properties.user.firstName);
    var lastName = request.param(properties.user.lastName);
    var sex = request.param(properties.user.sex);
    var dob = request.param(properties.user.dob);
    var contact = request.param(properties.user.contact);

    userService.saveUser([uName, encrypt.encrypt(pwd), roleId, firstName, lastName, sex, dob, contact, (teamId === '' ? '0' : teamId)], function(returnValue) {
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
    log.debug("editUser");
    var userId = request.user.id;
    var teamId = request.param(properties.user.teamId);
    var roleId = request.param(properties.user.roleId);
    var firstName = request.param(properties.user.firstName);
    var lastName = request.param(properties.user.lastName);
    var sex = request.param(properties.user.sex);
    var dob = request.param(properties.user.dob);
    var contact = request.param(properties.user.contact);

    userService.editUser([userId, roleId, firstName, lastName, sex, dob, contact, (teamId === '' ? '0' : teamId)], function(returnValue) {
        response.json(returnValue);
    });
};

exports.changePassword = function(request, response, callback) {
    log.debug("changePassword");
    var userId = request.user.id;
    var userName = request.user.username;
    var oldPwd = request.param(properties.user.oldPassword);
    var newPwd = request.param(properties.user.newPassword);
    userService.auth([userName, encrypt.encrypt(oldPwd)], function(res) {
        if (res.length == 0) {
            response.json({
                "Error": "Invalid old password."
            });
        } else {
            userService.editPassword([encrypt.encrypt(newPwd), userName], function(returnValue) {
                response.json(returnValue);
            });
        }
    });
};

exports.resetPassword = function(request, response, callback) {
    log.debug("resetPassword");
    //var userId = request.user.id;
    var pwd = request.param(properties.user.password);
    var contact = request.param(properties.user.contact);
    var username = request.param(properties.user.userName);

    userService.contactExist([username, contact], function(res) {
        if (res.length == 0) {
            response.json({
                "Error": "Invalid details entered."
            });
        } else {
            userService.editPassword([encrypt.encrypt(pwd), username], function(returnValue) {
                response.json(returnValue);
            });
        }
    });
};

exports.mapUser = function(request, response, callback) {
    log.debug("mapUser");
    var teamId = request.user.teamId;
    var userId = request.param(properties.team.userId);
    var description = request.param(properties.team.desc);

    teamResourceService.mapUser([teamId, userId, description], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveTeam = function(request, response, callback) {
    log.debug("saveTeam");
    var name = request.param(properties.team.name);
    var desc = request.param(properties.team.desc);
    var leadId = request.param(properties.team.leadId);

    teamService.saveTeam([name, desc, leadId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveProject = function(request, response, callback) {
    log.debug("saveProject");

    var userId = request.user.id;
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.saveProject([name, desc, strtDte, endDte, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editProject = function(request, response, callback) {
    log.debug("editProject");

    var id = request.param(properties.project.id);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.editProject([desc, strtDte, endDte, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveRole = function(request, response, callback) {
    log.debug("saveRole");
    var name = request.param(properties.role.name);
    var desc = request.param(properties.role.desc);
    roleService.saveRole([name, desc], function(returnValue) {
        response.json(returnValue);
    });
};

exports.addMyProject = function(request, response, callback) {
    var pid = request.param(properties.project.id);
    log.debug("addMyProject : " + pid);
    var userId = request.user.id;

    projectService.addMyProject([pid, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getProject = function(request, response, callback) {
    var pid = request.param(properties.project.id);
    log.debug("getProject : " + pid);
    projectService.getProject(pid, function(returnValue) {
        response.json(returnValue);
    });
};

exports.addResourceToProject = function(request, response, callback) {
    log.debug("addResourceToProject");
    var pid = request.param(properties.project.id);
    var uid = request.param(properties.project.userId);

    projectService.addResourceToProject([pid, uid], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeResourceFromProject = function(request, response, callback) {
    log.debug("removeResourceFromProject");
    var pid = request.param(properties.project.id);
    var uid = request.param(properties.project.userId);

    projectService.removeResourceFromProject([pid, uid], function(returnValue) {
        response.json(returnValue);
    });
};

exports.addNRemoveResourceFromProject = function(request, response, callback) {
    log.debug("addNRemoveResourceFromProject");
    var removePid = request.param(properties.project.removePid);
    var updatePid = request.param(properties.project.updatePid);
    var uid = request.param(properties.project.userId);

    projectService.addNRemoveResourceFromProject([updatePid, removePid, uid], function(returnValue) {
        response.json(returnValue);
    });
};

exports.saveLog = function(request, response, callback) {
    log.debug("saveLog");
    var userId = request.user.id;
    var projectId = request.param(properties.logs.projectId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);

    logService.saveLog([projectId, startDate, endDate, userId, desc], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editLog = function(request, response, callback) {
    log.debug("editLog");
    var id = request.param(properties.logs.id);
    var projectId = request.param(properties.logs.projectId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);

    logService.editLog([projectId, startDate, endDate, desc, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogs = function(request, response, callback) {
    log.debug("getLogs");
    var userId = request.user.id;
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    logService.getLogsByUserId([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserReportLogs = function(request, response, callback) {
    log.debug("getUserReportLogs");
    var userId = request.param(properties.team.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);	

    logService.getUserReportLogs([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getReportLogs = function(request, response, callback) {
    log.debug("getReportLogs");
    var userId = request.user.id;
    //var projectId = request.param(properties.project.id);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    logService.getReportLogs([startDate + startTime, endDate + endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.unlockLog = function(request, response, callback) {
    log.debug("unlockLog");
    var logId = request.param(properties.logs.id);
	var userId = request.param(properties.user.userId);
    
    logService.unlockLog([userId, logId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserLogs = function(request, response, callback) {
    log.debug("getUserLogs");
    var userId = request.param(properties.user.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    logService.getLogsByUserId([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogById = function(request, response, callback) {
    log.debug("getLog");
    var logId = request.param(properties.logs.id);

    logService.getLog(logId, function(returnValue) {
        response.json(returnValue);
    });
};