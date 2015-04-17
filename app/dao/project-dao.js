/**
 * CURD operations on projects
 */
var async = require("async"),
    pool = require("../db-manager/dbmanager").getPool(),
    userDao = require("../dao/user-dao"),
    util = require("../util/util"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("project-dao"),
    startTime = ' 00:00:00',
    endTime = ' 23:59:59';


exports.getAdminProjects = function(userId, callback) {
    try {
        var getAdminProjectsSQL = queries.project.getAdminProjects;

        pool.getConnection(function(err, connection) {
            connection.query(getAdminProjectsSQL, userId, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getTProjects = function(userId, callback) {
    try {
        var getTProjectsSQL = queries.project.getTProjects;

        pool.getConnection(function(err, connection) {
            connection.query(getTProjectsSQL, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    var TProjects = [];
                    if (rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            getTeamsAssignedToProject(rows[i], function(teams) {
                                TProjects.push(teams);
                                if (TProjects.length === rows.length) {
                                    callback(TProjects);
                                }
                            });
                        }
                    } else {
                        callback([]);
                    }
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getNonTProjects = function(teamId, callback) {
    try {
        var getNonTProjectsSQL = queries.project.getNonTProjects;

        pool.getConnection(function(err, connection) {
            connection.query(getNonTProjectsSQL, teamId, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

var getTeamsAssignedToProject = function(project, callback) {
    try {
        var getTeamsAssignedToProjectSQL = queries.project.getTeamsAssignedToProject;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamsAssignedToProjectSQL, project.id, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    project.teams = rows;
                    callback(project);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.saveAdminProject = function(obj, callback) {
    try {
        var saveAdminProjectSQL = queries.project.saveAdminProject;

        pool.getConnection(function(err, connection) {
            connection.query(saveAdminProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.editAdminProject = function(obj, callback) {
    try {
        var editAdminProjectSQL = queries.project.editAdminProject;

        pool.getConnection(function(err, connection) {
            connection.query(editAdminProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProjectsByTeamId = function(teamId, callback) {
    try {
        var getProjectsByTeamId = queries.project.getProjectsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getProjectsByTeamId, teamId, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserMappedProjectCountByTeamId = function(teamId, callback) {
    if (teamId) {
        try {
            var getUserMappedProjectCountByTeamIdSQL = queries.project.getUserMappedProjectCountByTeamId;

            pool.getConnection(function(err, connection) {
                connection.query(getUserMappedProjectCountByTeamIdSQL, teamId, function(err, rows) {
                    connection.release();
                    if (err) {
                        log.error(err);
                        callback(err);
                    } else {
                        callback(rows);
                    }
                });
            });
        } catch (e) {
            log.error(e);
        }
    } else {
        callback([]);
    }
};

exports.getTodayProjectsLogsByTeamId = function(obj, callback) {
    try {
        var getTodayProjectsLogsByTeamIdSQL = queries.log.getTodayProjectsLogsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getTodayProjectsLogsByTeamIdSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProjectMappedUserCountByTeamId = function(teamId, callback) {
    if (teamId) {
        try {
            var getProjectMappedUserCountByTeamIdSQL = queries.project.getProjectMappedUserCountByTeamId;

            pool.getConnection(function(err, connection) {
                connection.query(getProjectMappedUserCountByTeamIdSQL, teamId, function(err, rows) {
                    connection.release();
                    if (err) {
                        log.error(err);
                        callback(err);
                    } else {
                        callback(rows);
                    }
                });
            });
        } catch (e) {
            log.error(e);
        }
    } else {
        callback([]);
    }
};

exports.removeMyProject = function(obj, callback) {
    try {
        var removeMyProjectProSQL = queries.project.removeMyProjectPro;

        pool.getConnection(function(err, connection) {
            connection.query(removeMyProjectProSQL, obj[1], function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addMyProject = function(obj, callback) {
    try {
        var addMyProjectSQL = queries.project.addMyProject;

        pool.getConnection(function(err, connection) {
            connection.query(addMyProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserProjects = function(teamId, callback) {
    try {
        var getUserProjectsSQL = queries.project.getUserProjects;

        pool.getConnection(function(err, connection) {
            connection.query(getUserProjectsSQL, teamId, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.getTeamProjectsByTeamId = function(obj, callback) {
    try {
        var getTeamProjectsByTeamIdSQL = queries.project.getTeamProjectsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamProjectsByTeamIdSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getMyProjects = function(teamId, callback) {
    try {
        var getMyProjectsSQL = queries.project.getMyProjects;

        pool.getConnection(function(err, connection) {
            connection.query(getMyProjectsSQL, teamId, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    var myProjects = [];
                    if (rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            module.exports.getProjectNResources([rows[i].projectid, teamId, null], function(returnValue) {
                                myProjects.push(returnValue);
                                if (myProjects.length === rows.length) {
                                    callback(myProjects);
                                }
                            });
                        }
                    } else {
                        callback([]);
                    }
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getActiveProjectsByTeamId = function(teamId, callback) {
    try {
        var getActiveProjectsByTeamIdSQL = queries.project.getActiveProjectsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getActiveProjectsByTeamIdSQL, teamId, function(err, rows) {
                connection.release();
                var projects = [];
                if (rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        var pid = rows[i].id;
                        module.exports.getProjectNResources([pid, teamId, null], function(returnValue) {
                            projects.push(returnValue);
                            if (projects.length === rows.length) {
                                callback(projects);
                            }
                        });
                    }
                } else {
                    callback([]);
                }

            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProjectNResources = function(obj, callback) {
    try {
        var getProjectSQL = queries.project.getProject,
            pid = obj[0],
            teamId = obj[1];

        pool.getConnection(function(err, connection) {
            connection.query(getProjectSQL, [pid], function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    getResourcesForProject([pid, teamId], function(returnValue) {
                        if (rows.length > 0) {
                            rows[0].users = returnValue;
                        }
                        if (obj[2]) {
                            module.exports.addMyProject(obj, function(returnValue) {});
                        }
                        callback(rows[0]);
                    });
                }

            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProject = function(pid, callback) {
    try {
        var getProjectSQL = queries.project.getProject;

        pool.getConnection(function(err, connection) {
            connection.query(getProjectSQL, [pid], function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows[0]);
                }

            });
        });
    } catch (e) {
        log.error(e);
    }
};

var getResourcesForProject = function(obj, callback) {
    var resourcess = [];
    try {
        var getResourceForProjectsSQL = queries.project.getResourcesForProject;

        pool.getConnection(function(err, connection) {
            connection.query(getResourceForProjectsSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    if (rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            var user = rows[i];
                            getUserLoggedPerProject([user.id, obj[0], user.startdate + startTime, user.enddate + endTime], user, function(returnValue) {
                                resourcess.push(i);
                                if (resourcess.length === rows.length) {
                                    resourcess = null;
                                    callback(rows);
                                }
                            });
                        }
                    } else {
                        callback([]);
                    }

                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


var getResourceDetailsForProject = function(obj, callback) {
    try {
        userDao.getUserById(obj[1], function(user) {
            getUserLoggedPerProject([user.id, obj[0], obj[2] + startTime, obj[3] + endTime], user, function(rows) {

                var diffDays = util.dateDiffInDays(new Date(obj[3]), new Date());

                rows.days = diffDays;

                rows.billable = obj[5] ? 1 : 0;
                rows.startdate = obj[2];
                rows.enddate = obj[3];
                rows.sowno = obj[6];
                rows.description = obj[4];
                callback(rows);
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getDetailedProjectReportLogs = function(obj, callback) {
    try {
        getResourcesForProject(obj, function(resources) {
            callback(resources);
        });

    } catch (e) {
        log.error(e);
    }
};

var getUserLoggedPerProject = function(obj, user, callback) {
    try {
        var getUserLoggedPerProjectSQL = queries.log.getUserLoggedPerProject;

        pool.getConnection(function(err, connection) {
            connection.query(getUserLoggedPerProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    if (rows[0].logged) {
                        user.logged = rows[0].logged;
                    } else {
                        user.logged = 0;
                    }
                    callback(user);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }

};


exports.saveProject = function(obj, teamId, callback) {
    try {
        var saveProjectSQL = queries.project.saveProject;

        pool.getConnection(function(err, connection) {
            connection.query(saveProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    module.exports.giveAccessToProjectsByTeamId([rows.insertId, teamId], function(val) {
                        callback(rows.insertId);
                    });

                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.giveAccessToProjectsByTeamId = function(obj, callback) {
    try {
        var giveAccessToProjectsByTeamIdSQL = queries.project.giveAccessToProjectsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(giveAccessToProjectsByTeamIdSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.removeAccessToProjectsByTeamId = function(obj, callback) {
    try {
        var removeAccessToProjectsByTeamIdSQL = queries.project.removeAccessToProjectsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(removeAccessToProjectsByTeamIdSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.editProject = function(obj, callback) {
    try {
        var editProjectSQL = queries.project.editProject;

        pool.getConnection(function(err, connection) {
            connection.query(editProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeProject = function(obj, callback) {
    try {
        var removeProjectSQL = queries.project.removeProject;

        pool.getConnection(function(err, connection) {
            connection.query(removeProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addResourceToProject = function(obj, callback) {
    try {
        var addResourceToProjectSQL = queries.project.addResourceToProject;

        pool.getConnection(function(err, connection) {
            connection.query(addResourceToProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    if (rows.insertId) {
                        getResourceDetailsForProject(obj, function(val) {
                            val.projectresourceid = rows.insertId;
                            callback(val);
                        });
                    }
                    //callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editResourceOfProject = function(obj, prid, callback) {
    try {

        var editResourceOfProjectSQL = queries.project.editResourceOfProject;
        obj.push(prid);

        pool.getConnection(function(err, connection) {
            connection.query(editResourceOfProjectSQL, obj, function(err, rows) {
                obj.splice(obj.length - 1, 1);
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    getResourceDetailsForProject(obj, function(val) {
                        val.projectresourceid = prid;
                        callback(val);
                    });
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeResourceFromProject = function(prid, callback) {
    try {
        var removeResourceFromProjectSQL = queries.project.removeResourceFromProject;

        pool.getConnection(function(err, connection) {
            connection.query(removeResourceFromProjectSQL, prid, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addNRemoveResourceFromProject = function(obj, callback) {
    try {
        var addNRemoveResourceFromProjectSQL = queries.project.addNRemoveResourceFromProject;

        pool.getConnection(function(err, connection) {
            connection.query(addNRemoveResourceFromProjectSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

var getProjectResourcById = function(id, callback) {
    try {
        var getProjectResourcByIdSQL = queries.project.getProjectResourcById;
        pool.getConnection(function(err, connection) {
            var q = connection.query(getProjectResourcByIdSQL, id, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    callback([]);
                } else {
                    callback(rows[0]);
                }
            });
        });

    } catch (e) {
        log.error(e);
    }
};
