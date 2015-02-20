/**
 * team--resource-service.js
 */
var teamResourceDao = require("../dao/team-resource-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("team-resource-service");

exports.mapUser = function(obj, callback) {
    log.debug("mapUser");
    teamResourceDao.mapUser(obj, callback);
};
