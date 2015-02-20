/**
 * iteration-service.js
 */
var iterationDao = require("../dao/iteration-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("iteration-service");

exports.saveIteration = function(obj, callback) {
    log.debug("saveIteration");
    iterationDao.saveIteration(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getIterations = function(callback) {
    log.debug("getIterations");
    iterationDao.getIterations(callback);
};
