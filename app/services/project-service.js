/**
 * project-service.js
 */
var projectDao = require("../dao/project-dao"),
    util = require("../util/util"),
    async = require("async"),
    log = require('../logger/logger').logger("project-service");


exports.getAdminProjects = function(userId, callback) {
    log.debug("getAdminProjects");
    projectDao.getAdminProjects(userId, callback);
};

exports.getTProjects = function(userId, callback) {
    log.debug("getTProjects");
    projectDao.getTProjects(userId, callback);
};

exports.getNonTProjects = function(teamId, callback) {
    log.debug("getNonTProjects");
    projectDao.getNonTProjects(teamId, callback);
};

exports.giveAccessToProjectsByTeamId = function(obj, callback) {
    log.debug("giveAccessToProjectsByTeamId");

    projectDao.giveAccessToProjectsByTeamId(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeAccessToProjectsByTeamId = function(obj, callback) {
    log.debug("removeAccessToProjectsByTeamId");

    projectDao.removeAccessToProjectsByTeamId(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.saveAdminProject = function(obj, callback) {
    log.debug("saveAdminProject");
    projectDao.saveAdminProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editAdminProject = function(obj, callback) {
    log.debug("editAdminProject");
    projectDao.editAdminProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getDetailedProjectReportLogs = function(obj, callback) {
    log.debug("getDetailedProjectReportLogs");
    projectDao.getDetailedProjectReportLogs(obj, callback);
};

exports.getProjectsByTeamId = function(obj, finalcallback) {
    log.debug("getProjectsByTeamId");

    var userId = obj[0];
    var teamId = obj[1];

    if (!teamId) {
        finalcallback([]);
    } else {
        //run series of functions syncronously/by series 
        async.series({
                projects: function(callback) {
                    projectDao.getProjectsByTeamId(teamId, function(projects) {
                        if (projects.length === 0) {
                            finalcallback(projects);
                        }
                        callback(null, projects);
                    });
                },
                usersCount: function(callback) {
                    projectDao.getProjectMappedUserCountByTeamId(teamId, function(usersCount) {
                        callback(null, usersCount);
                    });
                },
                projectLogs: function(callback) {
                    projectDao.getTodayProjectsLogsByTeamId([teamId, obj[2], obj[3]], function(projectLogs) {
                        callback(null, projectLogs);
                    });
                }
            },
            function(err, results) {
                var projObj = results.projects,
                    usersCount = results.usersCount,
                    projectLogs = results.projectLogs;

                //merges multiple results
                // add user count to projObj
                for (var i = 0; i < usersCount.length; i++) {
                    for (var j = 0; j < projObj.length; j++) {
                        if (projObj[j].id === usersCount[i].projectid) {
                            projObj[j].count = usersCount[i].count;
                        }
                    }
                }

                // add project logs to projObj
                for (var i = 0; i < projectLogs.length; i++) {
                    for (var j = 0; j < projObj.length; j++) {
                        if (projObj[j].id === projectLogs[i].projectid) {
                            projObj[j].logged = projectLogs[i].logged;
                        }
                    }
                }

                finalcallback(projObj);
            });
    }
};

exports.getUserMappedProjectCountByTeamId = function(teamId, callback) {
    log.debug("getUserMappedProjectCountByTeamId");
    projectDao.getUserMappedProjectCountByTeamId(teamId, callback);
};

exports.getMyProjects = function(teamId, callback) {
    log.debug("getMyProjects");
    if (!teamId) {
        callback([]);
    } else {
        projectDao.getMyProjects(teamId, callback);
    }
};

exports.getActiveProjectsByTeamId = function(teamId, callback) {
    log.debug("getActiveProjectsByTeamId");
    if (!teamId) {
        callback([]);
    } else {
        projectDao.getActiveProjectsByTeamId(teamId, callback);
    }
};

exports.getUserProjects = function(teamId, callback) {
    log.debug("getUserProjects");
    projectDao.getUserProjects(teamId, callback);
};

exports.getTeamProjectsByTeamId = function(userId, callback) {
    log.debug("getTeamProjectsByTeamId");
    projectDao.getTeamProjectsByTeamId(userId, callback);
};

exports.removeMyProject = function(obj, callback) {
    log.debug("removeMyProject");
    projectDao.removeMyProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addMyProject = function(obj, callback) {
    log.debug("addMyProject");
    obj.push(true);
    projectDao.getProjectNResources(obj, callback);
};

exports.saveProject = function(obj, teamId, callback) {
    log.debug("saveProject");
    projectDao.saveProject(obj, teamId, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editProject = function(obj, callback) {
    log.debug("editProject");
    projectDao.editProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeProject = function(obj, callback) {
    log.debug("removeProject");
    projectDao.removeProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addResourceToProject = function(obj, callback) {
    log.debug("addResourceToProject");
    projectDao.addResourceToProject(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};


exports.editResourceOfProject = function(obj, prid, callback) {

    log.debug("editResourceOfProject");
    projectDao.editResourceOfProject(obj, prid, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeResourceFromProject = function(prid, callback) {
    log.debug("removeResourceFromProject");
    projectDao.removeResourceFromProject(prid, function(returnValue) {
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
