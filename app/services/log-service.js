/**
 * log-service.js
 */
var logDao = require("../dao/log-dao"),
    log = require('../logger/logger').logger("log-service"),
    util = require("../util/util");

exports.getStoryStatuses = function(callback) {
    log.debug("getStoryStatuses");
    logDao.getStoryStatuses(callback);
};

exports.getLogStatuses = function(callback) {
    log.debug("getLogStatuses");
    logDao.getLogStatuses(callback);
};

exports.getUserDetailsByLogid = function(logid, callback) {
    log.debug("getUserDetailsByLogid");
    logDao.getUserDetailsByLogid(logid, callback);
};

exports.getLogsByUserId = function(obj, callback) {
    log.debug("getLogsByUserId");
    logDao.getLogsByUserId(obj, callback);
};

exports.getLogById = function(logId, callback) {
    log.debug("getLogById");
    logDao.getLogById(logId, callback);
};

exports.getLogHistoryById = function(logId, callback) {
    log.debug("getLogHistoryById");
    logDao.getLogHistoryById(logId, callback);
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

exports.getTeamsReportLogs = function(obj, callback) {
    log.debug("getTeamsReportLogs");
    logDao.getTeamsReportLogs(obj, callback);
};

exports.getDetailedUserReportLogs = function(obj, callback) {
    log.debug("getDetailedUserReportLogs");
    logDao.getDetailedUserReportLogs(obj, callback);
};

exports.getDetailedReportLogs = function(obj, callback) {
    log.debug("getDetailedReportLogs");
    logDao.getDetailedReportLogs(obj, callback);
};

exports.unlockLog = function(obj, callback) {
    log.debug("unlockLog");
    logDao.unlockLog(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.unlockLogRequest = function(obj, callback) {
    log.debug("unlockLogRequest");
    logDao.unlockLogRequest(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.savePlannedLog = function(obj, callback) {
    log.debug("savePlannedLog");
    logDao.savePlannedLog(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.saveActualLog = function(obj, callback) {
    log.debug("saveActualLog");
    logDao.saveActualLog(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editLog = function(obj, logid, callback) {
    log.debug("editLog");
    logDao.editLog(obj, logid, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

var formatLogs = function(returnValue, callback) {
    try {
        if (returnValue.length === 0) {
            callback([]);
        }
        for (var i = 0; i < returnValue.length; i++) {
            if (returnValue[i].iteration === 0) {
                returnValue[i].iteration = '';
            }
            if (returnValue[i].story === 0) {
                returnValue[i].story = '';
            }
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
};
