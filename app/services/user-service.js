/**
 * user-service.js
 */
var async = require("async"),
    userDao = require("../dao/user-dao"),
    util = require("../util/util"),
    projectService = require("../services/project-service"),
    logService = require("../services/log-service"),
    log = require('../logger/logger').logger("user-service");

exports.getTeamUsersByTeamId = function(teamId, callback) {
    log.debug("getTeamUsersByTeamId");
    userDao.getTeamUsersByTeamId(teamId, callback);
};

exports.getExecutives = function(callback) {
    log.debug("getExecutives");
    userDao.getExecutives(callback);
};


exports.getTeamUsersAndAvailability = function(obj, finalcallback) {
    log.debug("getTeamUsersAndAvailability");

    var teamId = obj[0];

    if (!teamId) {
        finalcallback([]);
    } else {
        //run series of functions syncronously/by series
        async.series({
                users: function(callback) {
                    module.exports.getTeamUsersByTeamId(teamId, function(users) {
                        if (users.length == 0) {
                            finalcallback(users);
                        }
                        callback(null, users);
                    });
                },
                usersAvailability: function(callback) {
                    module.exports.getUsersAvailabilityTeamId(obj, function(usersAvailability) {
                        callback(null, usersAvailability);
                    });
                },
                projectCount: function(callback) {
                    projectService.getUserMappedProjectCountByTeamId(teamId, function(projectCount) {
                        callback(null, projectCount);
                    });
                },
                userLogs: function(callback) {
                    logService.getTodayUsersLogsByTeamId(obj, function(userLogs) {
                        callback(null, userLogs);
                    });
                }
            },
            // optional callback
            function(err, results) {
                var userObj = results.users,
                    usersAvailability = results.usersAvailability,
                    projectCount = results.projectCount,
                    userLogs = results.userLogs;

                //merges multiple results
                // add user availability to userObj
                for (var i = 0; i < usersAvailability.length; i++) {
                    if (usersAvailability[i].valid > 0) {
                        for (var j = 0; j < userObj.length; j++) {
                            if (userObj[j].id === usersAvailability[i].userid) {
                                userObj[j].status = 0;
                            }
                        }
                    }
                }

                // add project count to userObj
                for (var i = 0; i < projectCount.length; i++) {
                    for (var j = 0; j < userObj.length; j++) {
                        if (userObj[j].id === projectCount[i].userid) {
                            userObj[j].projectCount = projectCount[i].count;
                        }
                    }
                }

                // add user logs to userObj
                for (var i = 0; i < userLogs.length; i++) {
                    for (var j = 0; j < userObj.length; j++) {
                        if (userObj[j].id === userLogs[i].userid) {
                            userObj[j].logged = userLogs[i].logged;
                        }
                    }
                }

                finalcallback(userObj);
            });
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

exports.getUserByTeamId = function(teamId, callback) {
    log.debug("getUserByTeamId");
    userDao.getUserByTeamId(teamId, callback);
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

exports.removeUser = function(uid, callback) {
    log.debug("removeUser");
    userDao.removeUser(uid, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.verifyUser = function(uid, callback) {
    log.debug("verifyUser");
    userDao.verifyUser(uid, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getUnverifiedUsers = function(callback) {
    log.debug("getUnverifiedUsers");
    userDao.getUnverifiedUsers(function(returnValue) {
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
