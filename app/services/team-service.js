/**
 * team-service.js
 */
var teamDao = require("../dao/team-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("team-service");

exports.saveTeam = function(obj, callback) {
    log.debug("saveTeam");
    teamDao.saveTeam(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getTeams = function(callback) {
    log.debug("getTeams");
    teamDao.getTeams(callback);
};

exports.getTeam = function(userId, callback) {
    log.debug("getTeam");
    teamDao.getTeam(userId, callback);
};