/**
 * CURD operations on teams
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("team-dao");

exports.getTeams = function(callback) {
    try {
        var getTeamsSQL = queries.team.getTeams;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamsSQL, function(err, rows) {
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

exports.getExecutivesByTeamId = function(team, callback) {
    try {
        var getExecutivesByTeamIdSQL = queries.team.getExecutivesByTeamId;

        pool.getConnection(function(err, connection) {
            var q = connection.query(getExecutivesByTeamIdSQL, team.id, function(err, rows) {                
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    if(rows.length > 0){
                        team.executives = rows;
                        callback(team);
                    }else{
                        callback(team);
                    }
                    
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getExecutiveTeams = function(userId, callback) {
    try {
        var getExecutiveTeamsSQL = queries.team.getExecutiveTeams;

        pool.getConnection(function(err, connection) {
            connection.query(getExecutiveTeamsSQL, userId, function(err, rows) {
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

exports.getTeamByLeadId = function(userId, callback) {
    try {
        var getTeamByLeadIdSQL = queries.team.getTeamByLeadId;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamByLeadIdSQL, userId, function(err, rows) {
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

exports.getTeamByUserId = function(userId, callback) {
    try {
        var getTeamByUserIdSQL = queries.team.getTeamByUserId;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamByUserIdSQL, userId, function(err, rows) {
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

exports.getTeamLeadDetailsByUserId = function(userId, callback) {
    try {
        var getTeamLeadDetailsByUserIdSQL = queries.team.getTeamLeadDetailsByUserId;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamLeadDetailsByUserIdSQL, userId, function(err, rows) {
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

exports.saveTeam = function(obj, executives, callback) {
    try {
        var saveTeamSQL = queries.team.saveTeam;
        var userId = obj[3];

        pool.getConnection(function(err, connection) {
            connection.query(saveTeamSQL, obj, function(err, rows) {                
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    var teamId = rows.insertId;
                    
                    var lngt = new Array();
                    if(executives.length === 0){
                            callback(rows.insertId);
                        }
                    for(var i =0; i<executives.length;i++){                        
                        saveExecutives(executives[i], teamId, userId, function(eval){
                            lngt.push(eval);
                            if (lngt.length === executives.length) {
                                callback(rows.insertId);
                            }
                        });
                    }                    
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

var saveExecutives = function(executive, teamid, createdBy, callback) {
    try {
        var saveExecutivesSQL = queries.team.saveExecutives;

        pool.getConnection(function(err, connection) {
            connection.query(saveExecutivesSQL, [executive, teamid, createdBy], function(err, rows) {
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

var removeExecutives = function(teamid, callback) {
    try {
        var removeExecutivesByTeamidSQL = queries.team.removeExecutivesByTeamid;

        pool.getConnection(function(err, connection) {
            connection.query(removeExecutivesByTeamidSQL, teamid, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback([]);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editTeam = function(obj, executives, callback) {
    try {
        var editTeamSQL = queries.team.editTeam;
        var teamId = obj[4];
        var userId = obj[3];

        pool.getConnection(function(err, connection) {
            connection.query(editTeamSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    removeExecutives(teamId,function(){
                        var lngt = new Array();
                        if(executives.length === 0){
                                callback(rows.insertId);
                            }
                        for(var i =0; i<executives.length;i++){                        
                            saveExecutives(executives[i], teamId, userId, function(eval){
                                lngt.push(eval);
                                if (lngt.length === executives.length) {
                                    callback(rows.insertId);
                                }
                            });
                        }
                    });                    
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeTeam = function(obj, callback) {
    try {
        var removeTeamSQL = queries.team.removeTeam;

        pool.getConnection(function(err, connection) {
            connection.query(removeTeamSQL, obj, function(
                err, rows) {
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

exports.setPermissions = function(obj, callback) {
    try {
        var setPermissionsSQL = queries.team.setPermissions;

        pool.getConnection(function(err, connection) {
            connection.query(setPermissionsSQL, obj, function(
                err, rows) {
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
exports.hasLogAccess = function(userId, callback) {
    try {
        var hasLogAccessSQL = queries.team.hasLogAccess;

        pool.getConnection(function(err, connection) {
            connection.query(hasLogAccessSQL, userId, function(
                err, rows) {
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

exports.getTeamMembersByRole = function(roleId, callback) {
    try {
        var getTeamMembersByRoleSQL = queries.team.getTeamMembersByRole;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamMembersByRoleSQL, roleId, function(
                err, rows) {
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