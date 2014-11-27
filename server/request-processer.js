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
    util = require("../app/util/util"),
    startTime = ' 00:00:00',
    endTime = ' 23:59:59';


exports.auth = function(name, pwd, callback) {
    log.debug("auth : name is " + name);
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
    log.debug("getRoleByUserName : userName is " + userName);
    roleService.getRoleByUserName(userName, function(returnValue) {
        callback(returnValue)
    });
};

exports.getTeamByUserId = function(userId, callback) {
    log.debug("getTeamByUserName : userId is " + userId);
    teamService.getTeam(userId, function(returnValue) {
        callback(returnValue);
    });
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

exports.getUserById = function(userId, callback) {
    log.debug("getUserById");
    userService.getUserById(userId, function(returnValue) {
        callback(returnValue);
    });
};

exports.getTeamUsersAndAvailability = function(request, response, callback) {
    log.debug("getTeamUsersAndAvailability : logged in user is " + (request.user.id));
    var teamId = request.user.teamId;

    userService.getTeamUsersAndAvailability([teamId, startTime, endTime], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsers = function(request, response, callback) {
    log.debug("getTeamUsers : logged in user is " + (request.user.id));

    var teamId = request.user.teamId;
    userService.getTeamUsers(teamId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamUsersByTeamId = function(request, response, callback) {
    log.debug("getTeamUsers : logged in user is " + (request.user.id));

    var teamId = request.param(properties.team.id);
    userService.getTeamUsers(teamId, function(returnValue) {
        response.json(returnValue);
    });
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

exports.getTeamsAsObj = function(request, response, callback) {
    log.debug("getTeamsAsObj : logged in user is " + (request.user.id));
    teamService.getTeams(function(returnValue) {
        callback(returnValue);
    });
};

exports.getTeam = function(userId, request, response, callback) {
    log.debug("getTeam : logged in user is " + (request.user.id));
    module.exports.getTeamByUserId(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getProjects = function(request, response) {
    log.debug("getProjects : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.user.teamId;
    projectService.getProjects([userId, teamId, startTime, endTime], function(returnValue) {
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

exports.saveAdminProject = function(request, response, callback) {
    log.debug("saveAdminProject : logged in user is " + (request.user.id));

    var userId = request.user.id;
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.saveAdminProject([name, desc, strtDte, endDte, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editAdminProject = function(request, response, callback) {
    log.debug("editAdminProject : logged in user is " + (request.user.id));

    var id = request.param(properties.project.id);
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.editAdminProject([name, desc, strtDte, endDte, id], function(returnValue) {
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
    var userId = request.user.id;
    projectService.getMyProjects(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserProjects = function(request, response) {
    log.debug("getUserProjects : logged in user is " + (request.user.id));
    var userId = request.user.id;
    projectService.getUserProjects(userId, function(returnValue) {
        response.json(returnValue);
    });
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
    log.debug("editUser : logged in user is " + (request.user.id));
    var userId = request.user.id;
    var teamId = request.param(properties.user.teamId);
    var roleId = request.param(properties.user.roleId);
    var firstName = request.param(properties.user.firstName);
    var lastName = request.param(properties.user.lastName);
    var sex = request.param(properties.user.sex);
    var dob = request.param(properties.user.dob);
    var contact = request.param(properties.user.contact);

    userService.editUser([userId, roleId, firstName, lastName, sex, dob, contact, (teamId === '' ? '0' : teamId)], function(returnValue) {
        if (returnValue.message === 'success') {
            request.user.firstname = firstName;
            request.user.lastname = lastName;
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
    log.debug("saveTeam : logged in user is " + (request.user.id));

    var name = request.param(properties.team.name);
    var desc = request.param(properties.team.desc);
    var leadId = request.param(properties.team.leadId);

    teamService.saveTeam([name, desc, leadId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editTeam = function(request, response, callback) {
    log.debug("editTeam : logged in user is " + (request.user.id));

    var id = request.param(properties.team.id);
    var name = request.param(properties.team.name);
    var desc = request.param(properties.team.desc);
    var leadId = request.param(properties.team.leadId);

    teamService.editTeam([name, desc, leadId, id], function(returnValue) {
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
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.saveProject([name, desc, strtDte, endDte, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editProject = function(request, response, callback) {
    log.debug("editProject : logged in user is " + (request.user.id));

    var id = request.param(properties.project.id);
    var name = request.param(properties.project.name);
    var desc = request.param(properties.project.desc);
    var strtDte = request.param(properties.project.startDate);
    var endDte = request.param(properties.project.endDate);

    projectService.editProject([name, desc, strtDte, endDte, id], function(returnValue) {
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

    projectService.addMyProject([pid, userId], function(returnValue) {
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
    log.debug("addResourceToProject : logged in user is " + (request.user.id));
    var pid = request.param(properties.project.id);
    var uid = request.param(properties.project.userId);
    var startDate = request.param(properties.project.sowstartdate);
    var endDate = request.param(properties.project.sowenddate);
    var description = request.param(properties.project.sowprojectdescription);
    var billable = request.param(properties.project.billable);

    projectService.addResourceToProject([pid, uid, startDate, endDate, description, billable], function(returnValue) {
        response.json(returnValue);
    });
};

exports.removeResourceFromProject = function(request, response, callback) {
    log.debug("removeResourceFromProject : logged in user is " + (request.user.id));
    var pid = request.param(properties.project.id);
    var uid = request.param(properties.project.userId);

    projectService.removeResourceFromProject([pid, uid], function(returnValue) {
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

exports.saveLog = function(request, response, callback) {
    log.debug("saveLog : logged in user is " + (request.user.id));

    var userId = request.body.userid || request.user.id;
    var loggedUserId = request.user.id;

    var projectId = request.param(properties.logs.projectId);
    var iterationNo = request.param(properties.logs.iterationno);
    var storyDescription = request.param(properties.logs.storydescription);
    var logStatuses = request.param(properties.logs.logstatuses);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);

	logStatuses = (logStatuses == '' ? null : logStatuses);
	iterationNo = (iterationNo == '' ? null : iterationNo);

    logService.saveLog([projectId, iterationNo, storyDescription, logStatuses, startDate, endDate, userId, loggedUserId, desc], function(returnValue) {
        response.json(returnValue);
    });
};

exports.editLog = function(request, response, callback) {
    log.debug("editLog : logged in user is " + (request.user.id));

    var loggedUserId = request.user.id;

    var id = request.param(properties.logs.id);
    var projectId = request.param(properties.logs.projectId);
    var iterationNo = request.param(properties.logs.iterationno);
    var storydescription = request.param(properties.logs.storydescription);
    var logStatuses = request.param(properties.logs.logstatuses);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);
    var desc = request.param(properties.logs.desc);

	logStatuses = (logStatuses == '' ? null : logStatuses);
	iterationNo = (iterationNo == '' ? null : iterationNo);

    logService.editLog([projectId, iterationNo, storydescription, logStatuses, startDate, endDate, loggedUserId, desc, id], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogs = function(request, response, callback) {
    log.debug("getLogs : logged in user is " + (request.user.id));

    var userId = request.user.id;
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    logService.getLogsByUserId([startDate + startTime, endDate + endTime, userId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getLogStatuses = function(request, response, callback) {
    log.debug("getLogStatuses");
    logService.getLogStatuses(function(returnValue) {
        response.json(returnValue);
    });
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

exports.unlockLog = function(request, response, callback) {
    log.debug("unlockLog : logged in user is " + (request.user.id));

    var logId = request.param(properties.logs.id);
    var userId = request.param(properties.user.userId);

    logService.unlockLog([userId, logId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.unlockLogRequest = function(request, response, callback) {
    log.debug("unlockLogRequest : logged in user is " + (request.user.id));

    var logId = request.param(properties.logs.id);
    var userId = request.user.id;

    logService.unlockLogRequest([userId, logId], function(returnValue) {
        response.json(returnValue);
    });
};

exports.getUserLogs = function(request, response, callback) {
    log.debug("getUserLogs : logged in user is " + (request.user.id));

    var userId = request.param(properties.user.userId);
    var startDate = request.param(properties.logs.startDate);
    var endDate = request.param(properties.logs.endDate);

    logService.getLogsByUserId([startDate + startTime, endDate + endTime, userId], function(returnValue) {
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
    var accessLevel = request.body.accesslevel;
    var userId = request.body.id;
    var permissionsObj = [];
    permissionsObj.push(accessLevel, userId);
    teamService.setPermissions(permissionsObj, function(returnValue) {
        response.json(returnValue);
    });
};

exports.hasLogAccess = function(request, response) {
    var userId = request.user.id;
    teamService.hasLogAccess(userId, function(returnValue) {
        response.json(returnValue);
    });
};

exports.getTeamMembersByRole = function(request, response) {
    var roleId = request.query.roleId;
    teamService.getTeamMembersByRole(roleId, function(returnValue) {
        response.json(returnValue);
    });
};