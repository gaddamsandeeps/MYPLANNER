/**
 * CURD operations on logs
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("log-dao");

exports.getLogsByUserId = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getLogsByUserIdSQL = queries.log.getLogsByUserId;

        connection.query(getLogsByUserIdSQL, obj, function(err, rows) {
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

exports.getTodayUsersLogsByTeamId = function(teamId, callback) {
    try {
        var connection = db.getConnection(),
            getTodayUsersLogsByTeamIdSQL = queries.log.getTodayUsersLogsByTeamId;

        connection.query(getTodayUsersLogsByTeamIdSQL, teamId, function(err, rows) {
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

exports.getLogById = function(logId, callback) {
    try {
        var connection = db.getConnection(),
            getLogByIdSQL = queries.log.getLogById;

        connection.query(getLogByIdSQL, logId, function(err, rows) {
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

exports.getUserReportLogs = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getUserReportLogsSQL = queries.log.getUserReportLogs;

        connection.query(getUserReportLogsSQL, obj, function(err, rows) {
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

exports.getReportLogs = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getReportLogsSQL = queries.log.getReportLogs;

        connection.query(getReportLogsSQL, obj, function(err, rows) {
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

exports.unlockLog = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            unlockLogSQL = queries.log.unlockLog;

        connection.query(unlockLogSQL, obj, function(err, rows) {
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


exports.saveLog = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            saveLogSQL = queries.log.saveLog;

        connection.query(saveLogSQL, obj, function(err, rows) {
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

exports.editLog = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            editLogSQL = queries.log.editLog;

        connection.query(editLogSQL, obj, function(err, rows) {
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