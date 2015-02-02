/**
 * CURD operations on iteration
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("iteration-dao");

exports.saveIteration = function(obj, callback) {
    try {
        var saveIterationSQL = queries.iteration.saveIteration;

        pool.getConnection(function(err, connection) {
            connection.query(saveIterationSQL, obj, function(err, rows) {
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

exports.getIterations = function(callback) {
    try {
        var getIterationsSQL = queries.iteration.getIterations;

        pool.getConnection(function(err, connection) {
            connection.query(getIterationsSQL, function(err, rows) {
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