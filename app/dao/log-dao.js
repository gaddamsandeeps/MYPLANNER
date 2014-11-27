/**
 * CURD operations on logs
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("log-dao");


exports.getLogStatuses = function(callback) {
    try {
        var getLogStatusesSQL = queries.logstatus.getLogStatuses;

        pool.getConnection(function(err, connection) {
            connection.query(getLogStatusesSQL, function(err, rows) {
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

exports.getLogsByUserId = function(obj, callback) {
    try {
        var getLogsByUserIdSQL = queries.log.getLogsByUserId;

        pool.getConnection(function(err, connection) {
            connection.query(getLogsByUserIdSQL, obj, function(err, rows) {
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

exports.getTodayUsersLogsByTeamId = function(teamId, callback) {
    try {
        var getTodayUsersLogsByTeamIdSQL = queries.log.getTodayUsersLogsByTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getTodayUsersLogsByTeamIdSQL, teamId, function(err, rows) {
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

exports.getLogById = function(logId, callback) {
    try {
        var getLogByIdSQL = queries.log.getLogById;

        pool.getConnection(function(err, connection) {
            connection.query(getLogByIdSQL, logId, function(err, rows) {
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

exports.getLogHistoryById = function(logId, callback) {
    try {
        var getLogHistoryByIdSQL = queries.log.getLogHistoryById;

        pool.getConnection(function(err, connection) {
            connection.query(getLogHistoryByIdSQL, logId, function(err, rows) {
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

exports.getUserReportLogs = function(obj, callback) {
    try {
        var getUserReportLogsSQL = queries.log.getUserReportLogs;

        pool.getConnection(function(err, connection) {
            connection.query(getUserReportLogsSQL, obj, function(err, rows) {
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

exports.getReportLogs = function(obj, callback) {
    try {
        var getReportLogsSQL = queries.log.getReportLogs;

        pool.getConnection(function(err, connection) {
            connection.query(getReportLogsSQL, obj, function(err, rows) {
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

exports.getDetailedUserReportLogs = function(obj, callback) {
    try {
        var getDetailedUserReportLogsSQL = queries.log.getDetailedUserReportLogs;

        pool.getConnection(function(err, connection) {
            connection.query(getDetailedUserReportLogsSQL, obj, function(err, rows) {
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

exports.getDetailedReportLogs = function(obj, callback) {
    try {
        var getDetailedReportLogsSQL = queries.log.getDetailedReportLogs;

        pool.getConnection(function(err, connection) {
            connection.query(getDetailedReportLogsSQL, obj, function(err, rows) {
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

exports.unlockLog = function(obj, callback) {
    try {
        var unlockLogSQL = queries.log.unlockLog;

        pool.getConnection(function(err, connection) {
            connection.query(unlockLogSQL, obj, function(err, rows) {
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

exports.unlockLogRequest = function(obj, callback) {
    try {
        var unlockLogSQL = queries.log.unlockLogRequest;

        pool.getConnection(function(err, connection) {
            connection.query(unlockLogSQL, obj, function(err, rows) {
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


exports.saveLog = function(obj, callback) {
    try {
        var saveLogSQL = queries.log.saveLog;

        pool.getConnection(function(err, connection) {
            connection.query(saveLogSQL, obj, function(err, rows) {
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

exports.editLog = function(obj, callback) {
    try {
        var editLogSQL = queries.log.editLog;

        var logId = obj[8];
        saveLogHistory(logId);

        pool.getConnection(function(err, connection) {
            connection.query(editLogSQL, obj, function(err, rows) {
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

var saveLogHistory = function(logId) {
    try {
        var saveLogHistorySQL = queries.log.saveLogHistory;

        module.exports.getLogById(logId, function(val) {
            var obj = [val.id, val.projectid, val.iteration, val.story, val.status, val.startdate, val.enddate, val.userid, val.loggeduser, val.description,
                val.createddate, val.editdate, val.locked, val.lockrequest
            ];

            pool.getConnection(function(err, connection) {
                connection.query(saveLogHistorySQL, obj, function(err, rows) {
                    connection.release();
                    if (err) {
                        console.log(err);
                    }
                });
            });
        });

    } catch (e) {
        log.error(e);
    }
};