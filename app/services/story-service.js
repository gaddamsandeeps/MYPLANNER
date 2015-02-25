/**
 * story-service.js
 */
var storyDao = require("../dao/story-dao"),
    util = require("../util/util"),
    log = require('../logger/logger').logger("story-service");

exports.saveStory = function(obj, callback) {
    log.debug("saveStory");
    storyDao.saveStory(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.editStory = function(obj, sid, callback) {
    log.debug("editStory");
    storyDao.editStory(obj, sid, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeStory = function(obj, id, callback) {
    log.debug("removeStory");
    storyDao.removeStory(obj, id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.moveToNextIteration = function(obj, callback) {
    log.debug("moveToNextIteration");
    storyDao.moveToNextIteration(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.addStoryComment = function(obj, callback) {
    log.debug("addStoryComment");
    storyDao.addStoryComment(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getStoryTypes = function(callback) {
    log.debug("getStoryTypes");
    storyDao.getStoryTypes(callback);
};

exports.getStories = function(pid, callback) {
    log.debug("getStories");
    storyDao.getStories(pid, callback);
};

exports.getStoriesNTasks = function(pid, callback) {
    log.debug("getStoriesNTasks");
    storyDao.getStoriesNTasks(pid, callback);
};

exports.getStoriesNTasksByPidnIterId = function(obj, callback) {
    log.debug("getStoriesNTasksByPidnIterId");
    storyDao.getStoriesNTasksByPidnIterId(obj, callback);
};

exports.getInCompleteStoriesNTasksByPidnIterId = function(obj, callback) {
    log.debug("getInCompleteStoriesNTasksByPidnIterId");
    storyDao.getInCompleteStoriesNTasksByPidnIterId(obj, callback);
};

exports.getStory = function(id, callback) {
    log.debug("getStory");
    storyDao.getStory(id, callback);
};
