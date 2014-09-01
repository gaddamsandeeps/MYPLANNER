/**
 * CURD operations on team resources
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("team-resource-dao");

exports.mapUser = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            mapUserProSQL = queries.team.mapUserPro;

        connection.query(mapUserProSQL, obj, function(err, rows) {
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