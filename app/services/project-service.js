/**
 * project-service.js
 */
var projectDao = require("../dao/project-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("project-service");

exports.getProjects = function(obj, callback) {
    log.debug("getProjects");

    var noOfFun = 0,
        userId = obj[0];
    var projObj = null;

    projectDao.getProjects(userId, function(returnValue) {
        if (returnValue.length == 0) {
            callback(returnValue);
        }
        projObj = returnValue;
        noOfFun++;
        complete();
    });

    projectDao.getProjectMappedUserCountByTeamId(obj[1], function(returnValue) {
        if (returnValue.length == 0) {
            noOfFun++;
            complete();
        }
        for (var i = 0; i < returnValue.length; i++) {
            for (var j = 0; j < projObj.length; j++) {
                if (projObj[j].id === returnValue[i].projectid) {
                    projObj[j].count = returnValue[i].count;
                }
            }
            if (i === returnValue.length - 1) {
                noOfFun++;
                complete();
            }
        }
    });

	projectDao.getTodayProjectsLogsByLeadId([userId,  obj[2], obj[3]], function(returnValue) {
        if (returnValue.length == 0) {
            noOfFun++;
            complete();
        }
        for (var i = 0; i < returnValue.length; i++) {
            for (var j = 0; j < projObj.length; j++) {
                if (projObj[j].id === returnValue[i].projectid) {
                    projObj[j].logged = returnValue[i].logged;
                }
            }
            if (i === returnValue.length - 1) {
                noOfFun++;
                complete();
            }
        }
    });

    function complete() {
        if (noOfFun === 3) {
            callback(projObj);
        }
    }
};

exports.getUserMappedProjectCountByTeamId = function(teamId, callback) {
    log.debug("getUserMappedProjectCountByTeamId");
    projectDao.getUserMappedProjectCountByTeamId(teamId, callback);
};

exports.getMyProjects = function(userId, callback) {
    log.debug("getMyProjects");
    projectDao.getMyProjects(userId, callback);
};

exports.getUserProjects = function(userId, callback) {
    log.debug("getUserProjects");
    projectDao.getUserProjects(userId, callback);
};

exports.removeMyProject = function(obj, callback) {
    log.debug("removeMyProject");
    projectDao.removeMyProject(obj, callback);
};

exports.addMyProject = function(obj, callback) {
    log.debug("addMyProject");
    projectDao.getProjectNResources(obj, callback);
};

exports.saveProject = function(obj, callback) {
    log.debug("saveProject");
    projectDao.saveProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editProject = function(obj, callback) {
    log.debug("editProject");
    projectDao.editProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addResourceToProject = function(obj, callback) {
    log.debug("addResourceToProject");
    projectDao.addResourceToProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeResourceFromProject = function(obj, callback) {
    log.debug("removeResourceFromProject");
    projectDao.removeResourceFromProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addNRemoveResourceFromProject = function(obj, callback) {
    log.debug("addNRemoveResourceFromProject");
    projectDao.addNRemoveResourceFromProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getProject = function(pid, callback) {
    log.debug("getProject");
    projectDao.getProject(pid, callback);
};