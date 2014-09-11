/**
 * role-service.js
 */
var roleDao = require("../dao/role-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("role-service");

exports.getRoles = function(callback) {
    log.debug("getRoles");
    roleDao.getRoles(callback);
};

exports.getRole = function(userId, callback) {
    log.debug("getRole");
    roleDao.getRole(userId, callback);
};

exports.getRoleByUserName = function(name, callback) {
    log.debug("getRoleByUserName");
    roleDao.getRoleByUserName(name, callback);
};

exports.saveRole = function(obj, callback) {
    log.debug("saveRole");
    roleDao.saveRole(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editRole = function(obj, callback) {
    log.debug("editRole");
    roleDao.editRole(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeRole = function(obj, callback) {
    log.debug("removeRole");
    roleDao.removeRole(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};