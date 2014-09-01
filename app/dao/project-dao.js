/**
 * CURD operations on projects
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("project-dao");

exports.getProjects = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getProjectsSQL = queries.project.getProjects;

        connection.query(getProjectsSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserMappedProjectCountByTeamId = function(teamId, callback) {
    try {
        var connection = db.getConnection(),
            getUserMappedProjectCountByTeamIdSQL = queries.project.getUserMappedProjectCountByTeamId;

        connection.query(getUserMappedProjectCountByTeamIdSQL, teamId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getTodayProjectsLogsByLeadId = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getTodayProjectsLogsByLeadIdSQL = queries.log.getTodayProjectsLogsByLeadId;

        connection.query(getTodayProjectsLogsByLeadIdSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProjectMappedUserCountByTeamId = function(teamId, callback) {
    try {
        var connection = db.getConnection(),
            getProjectMappedUserCountByTeamIdSQL = queries.project.getProjectMappedUserCountByTeamId;

        connection.query(getProjectMappedUserCountByTeamIdSQL, teamId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeMyProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            removeMyProjectProSQL = queries.project.removeMyProjectPro;

        connection.query(removeMyProjectProSQL, obj[1], function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addMyProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            addMyProjectSQL = queries.project.addMyProject;
        connection.query(addMyProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserProjects = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getUserProjectsSQL = queries.project.getUserProjects;
        connection.query(getUserProjectsSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getMyProjects = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getMyProjectsSQL = queries.project.getMyProjects;

        connection.query(getMyProjectsSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                var myProjects = new Array();
                if (rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        module.exports.getProjectNResources([rows[i].projectid, null], function(returnValue) {
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
    } catch (e) {
        log.error(e);
    }
};

exports.getProjectNResources = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getProjectSQL = queries.project.getProject,
            pid = obj[0];

        connection.query(getProjectSQL, [pid], function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                getResourcesForProject(pid, function(returnValue) {
                    if (rows.length > 0) {
                        rows[0].users = returnValue;
                    }
                    if (obj[1]) {
                        module.exports.addMyProject(obj, function(returnValue) {});
                    }
                    callback(rows[0]);
                });
            }

        });
    } catch (e) {
        log.error(e);
    }
};

exports.getProject = function(pid, callback) {
    try {
        var connection = db.getConnection(),
            getProjectSQL = queries.project.getProject;

        connection.query(getProjectSQL, [pid], function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }

        });
    } catch (e) {
        log.error(e);
    }
};

var getResourcesForProject = function(id, callback) {
    try {
        var connection = db.getConnection(),
            getResourceForProjectsSQL = queries.project.getResourcesForProject;

        connection.query(getResourceForProjectsSQL, [id], function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};


exports.saveProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            saveProjectSQL = queries.project.saveProject;
        connection.query(saveProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows.insertId);
            }
        });
    } catch (e) {
        log.error(e);
    }
};


exports.editProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            editProjectSQL = queries.project.editProject;
        connection.query(editProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows.insertId);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addResourceToProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            addResourceToProjectSQL = queries.project.addResourceToProject;
        connection.query(addResourceToProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows.insertId);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeResourceFromProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            removeResourceFromProjectSQL = queries.project.removeResourceFromProject;
        connection.query(removeResourceFromProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows.insertId);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.addNRemoveResourceFromProject = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            addNRemoveResourceFromProjectSQL = queries.project.addNRemoveResourceFromProject;
        connection.query(addNRemoveResourceFromProjectSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows.insertId);
            }
        });
    } catch (e) {
        log.error(e);
    }
};