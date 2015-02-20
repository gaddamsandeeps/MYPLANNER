/**
 * task-service.js
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

exports.editTask = function(obj, id, callback) {
    log.debug("editTask");
    taskDao.editTask(obj, id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeTask = function(obj, id, callback) {
    log.debug("removeTask");
    taskDao.removeTask(obj, id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.changeTaskStatus = function(obj, type, callback) {
    log.debug("changeTaskStatus");
    taskDao.changeTaskStatus(obj, type, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addTaskComment = function(obj, callback) {
    log.debug("addTaskComment");
    taskDao.addTaskComment(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getTasks = function(sid, callback) {
    log.debug("getTasks");
    taskDao.getTasks(sid, callback);
};

exports.getInCompleteTasks = function(sid, callback) {
    log.debug("getInCompleteTasks");
    taskDao.getInCompleteTasks(sid, callback);
};

exports.getTask = function(id, callback) {
    log.debug("getTask");
    taskDao.getTask(id, callback);
};

exports.getTaskStatuses = function(callback) {
    log.debug("getTaskStatuses");
    taskDao.getTaskStatuses(callback);
};
