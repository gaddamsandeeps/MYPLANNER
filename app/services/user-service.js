/**
 * user-service.js
 */
var userDao = require("../dao/user-dao"),
    util = require("../util/util"),
    projectService = require("../services/project-service"),
    logService = require("../services/log-service"),
    log = require('../logger/logger').logger("user-service");

exports.getTeamUsers = function(userId, callback) {
    log.debug("getTeamUsers");
    userDao.getTeamUsers(userId, callback);
};

exports.getTeamUsersAndAvailability = function(obj, callback) {
    log.debug("getTeamUsersAndAvailability");
    var noOfFun = 0,
        userObj = null,
        teamId = obj[0];

    module.exports.getTeamUsers(teamId, function(users) {
        if (users.length == 0) {
            callback(users);
        }
        userObj = users;



        module.exports.getUsersAvailabilityTeamId(obj, function(usersAvailability) {
            if (usersAvailability.length == 0) {
                noOfFun++;
                complete();
            }
            for (var i = 0; i < usersAvailability.length; i++) {
                if (usersAvailability[i].valid > 0) {
                    for (var j = 0; j < userObj.length; j++) {
                        if (userObj[j].id === usersAvailability[i].userid) {
                            userObj[j].status = 0;
                        }
                    }
                }
                if (i === usersAvailability.length - 1) {
                    noOfFun++;
                    complete();
                }
            }
        });

        projectService.getUserMappedProjectCountByTeamId(teamId, function(projectCount) {
            if (projectCount.length == 0) {
                noOfFun++;
                complete();
            }
            for (var i = 0; i < projectCount.length; i++) {
                for (var j = 0; j < userObj.length; j++) {
                    if (userObj[j].id === projectCount[i].userid) {
                        userObj[j].projectCount = projectCount[i].count;
                    }
                }
                if (i === projectCount.length - 1) {
                    noOfFun++;
                    complete();
                }
            }
        });

        logService.getTodayUsersLogsByTeamId(obj, function(userLogs) {
            if (userLogs.length == 0) {
                noOfFun++;
                complete();
            }
            for (var i = 0; i < userLogs.length; i++) {
                for (var j = 0; j < userObj.length; j++) {
                    if (userObj[j].id === userLogs[i].userid) {
                        userObj[j].logged = userLogs[i].logged;
                    }
                }
                if (i === userLogs.length - 1) {
                    noOfFun++;
                    complete();
                }
            }
        });

    });

    function complete() {
        if (noOfFun === 3) {
            callback(userObj);
        }
    }
};

exports.getUsersAvailabilityTeamId = function(teamId, callback) {
    log.debug("getUsersAvailabilityTeamId");
    userDao.getUsersAvailabilityTeamId(teamId, callback);
};

exports.getUser = function(userId, callback) {
    log.debug("getUser");
    userDao.getUser(userId, callback);
};

exports.getUserById = function(userId, callback) {
    log.debug("getUserById");
    userDao.getUserById(userId, callback);
};

exports.getUserByName = function(userName, callback) {
    log.debug("getUserByName");
    userDao.getUserByName(userName, callback);
};

exports.getNonTeamUsers = function(userId, callback) {
    log.debug("getNonTeamUsers");
    userDao.getNonTeamUsers(userId, callback);
};

exports.getLeads = function(callback) {
    log.debug("getLeads");
    userDao.getLeads(callback);
};

exports.saveUser = function(obj, callback) {
    log.debug("saveUser");
    userDao.saveUser(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.userExist = function(uName, callback) {
    log.debug("userExist");
    userDao.userExist(uName, callback);
};

exports.contactExist = function(obj, callback) {
    log.debug("contactExist");
    userDao.contactExist(obj, callback);
};

exports.editUser = function(obj, callback) {
    log.debug("editUser");
    userDao.editUser(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editPassword = function(obj, callback) {
    log.debug("editPassword");
    userDao.editPassword(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.auth = function(obj, callback) {
    log.debug("auth");
    userDao.auth(obj, callback);
};