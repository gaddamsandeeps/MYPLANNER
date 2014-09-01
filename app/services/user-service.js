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
        teamId = obj[0];
    var userObj = null;

    module.exports.getTeamUsers(teamId, function(returnValue) {
        if (returnValue.length == 0) {
            callback(returnValue);
        }
        userObj = returnValue;
        noOfFun++;
        complete();
    });

    module.exports.getUsersAvailabilityTeamId(obj, function(returnValue) {
        if (returnValue.length == 0) {
            noOfFun++;
            complete();
        }
        for (var i = 0; i < returnValue.length; i++) {
            if (returnValue[i].valid > 0) {
                for (var j = 0; j < userObj.length; j++) {
                    if (userObj[j].id === returnValue[i].userid) {
                        userObj[j].status = 0;
                    }
                }
            }
            if (i === returnValue.length - 1) {
                noOfFun++;
                complete();
            }
        }
    });

    projectService.getUserMappedProjectCountByTeamId(teamId, function(returnValue) {
        if (returnValue.length == 0) {
            noOfFun++;
            complete();
        }
        for (var i = 0; i < returnValue.length; i++) {
            for (var j = 0; j < userObj.length; j++) {
                if (userObj[j].id === returnValue[i].userid) {
                    userObj[j].projectCount = returnValue[i].count;
                }
            }
            if (i === returnValue.length - 1) {
                noOfFun++;
                complete();
            }
        }
    });

    logService.getTodayUsersLogsByTeamId(obj, function(returnValue) {
        if (returnValue.length == 0) {
            noOfFun++;
            complete();
        }
        for (var i = 0; i < returnValue.length; i++) {
            for (var j = 0; j < userObj.length; j++) {
                if (userObj[j].id === returnValue[i].userid) {
                    userObj[j].logged = returnValue[i].logged;
                }
            }
            if (i === returnValue.length - 1) {
                noOfFun++;
                complete();
            }
        }
    });

    function complete() {
        if (noOfFun === 4) {
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