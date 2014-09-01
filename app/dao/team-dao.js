/**
 * CURD operations on teams
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("team-dao");

exports.getTeams = function(callback) {
    try {
        var connection = db.getConnection(),
            getTeamsSQL = queries.team.getTeams;

        connection.query(getTeamsSQL, function(err, rows) {
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

exports.getTeam = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getTeamSQL = queries.team.getTeam;

        connection.query(getTeamSQL, userId, function(err, rows) {
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

exports.saveTeam = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            saveTeamSQL = queries.team.saveTeam;
        connection.query(saveTeamSQL, obj, function(
            err, rows) {
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