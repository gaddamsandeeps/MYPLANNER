/**
 * log-service.js
 */
var logDao = require("../dao/log-dao"),
    log = require('../logger/logger').logger("log-service"),
    util = require("../util/util");

exports.getLogsByUserId = function(obj, callback) {
    log.debug("getLogsByUserId");
    logDao.getLogsByUserId(obj, function(returnValue) {
        formatDates(returnValue, callback);
    });
};

exports.getLogById = function(logId, callback) {
    log.debug("getLogById");
    logDao.getLogById(logId, callback);
};

exports.getTodayUsersLogsByTeamId = function(teamId, callback) {
    log.debug("getTodayUsersLogsByTeamId");
    logDao.getTodayUsersLogsByTeamId(teamId, callback);
};

exports.getUserReportLogs = function(obj, callback) {
    log.debug("getUserReportLogs");
    logDao.getUserReportLogs(obj, callback);
};

exports.getReportLogs = function(obj, callback) {
    log.debug("getReportLogs");
    logDao.getReportLogs(obj, callback);
};

exports.getDetailedUserReportLogs = function(obj, callback) {
    log.debug("getDetailedUserReportLogs");
    logDao.getDetailedUserReportLogs(obj, function(returnValue) {
        formatDates(returnValue, callback);
    });
};

exports.getDetailedReportLogs = function(obj, callback) {
    log.debug("getDetailedReportLogs");
    logDao.getDetailedReportLogs(obj, function(returnValue) {
        formatDates(returnValue, callback);
    });
};

exports.unlockLog = function(obj, callback) {
    log.debug("unlockLog");
    logDao.unlockLog(obj, callback);
};

exports.saveLog = function(obj, callback) {
    log.debug("saveLog");
    logDao.saveLog(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editLog = function(obj, callback) {
    log.debug("editLog");
    logDao.editLog(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

var formatDates = function(returnValue, callback) {
    try {
        if (returnValue.length == 0) {
            callback([]);
        }
        for (var i = 0; i < returnValue.length; i++) {
            returnValue[i].start = util.formatDate(returnValue[i].start);
            returnValue[i].end = util.formatDate(returnValue[i].end);
            if (returnValue[i].created) {
                returnValue[i].created = util.formatDate(returnValue[i].created);
            }
            if (returnValue[i].edit) {
                returnValue[i].edit = util.formatDate(returnValue[i].edit);
            }
            if (i === returnValue.length - 1) {
                callback(returnValue);
            }
        }

    } catch (e) {
        log.error(e);
        callback([]);
    }
}