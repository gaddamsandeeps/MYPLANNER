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

exports.getTeam = function(userId, callback) {
    try {
        var getTeamSQL = queries.team.getTeam;

        pool.getConnection(function(err, connection) {
            connection.query(getTeamSQL, userId, function(err, rows) {
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

exports.saveTeam = function(obj, callback) {
    try {
        var saveTeamSQL = queries.team.saveTeam;

        pool.getConnection(function(err, connection) {
            connection.query(saveTeamSQL, obj, function(err, rows) {
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

exports.editTeam = function(obj, callback) {
    try {
        var editTeamSQL = queries.team.editTeam;

        pool.getConnection(function(err, connection) {
            connection.query(editTeamSQL, obj, function(err, rows) {
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