/**
 * story-service.js
 */
var taskDao = require("../dao/task-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("task-service");

exports.saveTask = function(obj, callback) {
    log.debug("saveTask");
    taskDao.saveTask(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editTask = function(obj, callback) {
    log.debug("editTask");
    taskDao.editTask(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeTask = function(id, callback) {
    log.debug("removeTask");
    taskDao.removeTask(id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.taskCompleted = function(id, callback) {
    log.debug("taskCompleted");
    taskDao.taskCompleted(id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getTasks = function(sid, callback) {
    log.debug("getTasks");
    taskDao.getTasks(sid, callback);
};

exports.getTask = function(id, callback) {
    log.debug("getTask");
    taskDao.getTask(id, callback);
};