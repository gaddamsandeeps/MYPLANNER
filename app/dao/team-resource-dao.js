/**
 * CURD operations on team resources
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("team-resource-dao");

exports.mapUser = function(obj, callback) {
    try {
        var mapUserProSQL = queries.team.mapUserPro;

        pool.getConnection(function(err, connection) {
            connection.query(mapUserProSQL, obj, function(err, rows) {
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