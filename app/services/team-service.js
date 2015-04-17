/**
 * team-service.js
 */
var async = require("async"),
    teamDao = require("../dao/team-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("team-service");

exports.saveTeam = function(obj, executives, callback) {
    log.debug("saveTeam");
    teamDao.saveTeam(obj, executives, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editTeam = function(obj, executives, callback) {
    log.debug("editTeam");
    teamDao.editTeam(obj, executives, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeTeam = function(teamId, callback) {
    log.debug("removeTeam");
    teamDao.removeTeam(teamId, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getTeams = function(callback) {
    log.debug("getTeams");
    teamDao.getTeams(function(teams) {
        var lngt = [];
        if (teams.length === 0) {
            callback([]);
        }
        for (var i = 0; i < teams.length; i++) {
            teamDao.getExecutivesByTeamId(teams[i], function(val) {
                lngt.push(val);
                if (lngt.length === teams.length) {
                    callback(lngt);
                }
            });
        }

    });
};

exports.getExecutiveTeams = function(userId, callback) {
    log.debug("getExecutiveTeams");
    teamDao.getExecutiveTeams(userId, callback);
};

exports.getExecutivesByTeamId = function(teamId, callback) {
    log.debug("getExecutivesByTeamId");
    teamDao.getExecutivesByTeamId(teamId, callback);
};

exports.getTeamByLeadId = function(userId, callback) {
    log.debug("getTeamByLeadId");
    teamDao.getTeamByLeadId(userId, callback);
};

exports.getTeamByUserId = function(userId, callback) {
    log.debug("getTeamByUserId");
    teamDao.getTeamByUserId(userId, callback);
};

exports.getTeamLeadDetailsByUserId = function(userId, callback) {
    log.debug("getTeamLeadDetailsByUserId");
    teamDao.getTeamLeadDetailsByUserId(userId, callback);
};

exports.setPermissions = function(obj, callback) {
    teamDao.setPermissions(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.hasLogAccess = function(userId, callback) {
    teamDao.hasLogAccess(userId, callback);
};

exports.getTeamMembersByRole = function(roleId, callback) {
    teamDao.getTeamMembersByRole(roleId, callback);
};
