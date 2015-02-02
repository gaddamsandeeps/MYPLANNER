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

exports.editStory = function(obj, callback) {
    log.debug("editStory");
    storyDao.editStory(obj, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.removeStory = function(id, callback) {
    log.debug("removeStory");
    storyDao.removeStory(id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.storyCompleted = function(id, callback) {
    log.debug("storyCompleted");
    storyDao.storyCompleted(id, function(returnValue) {
        util.handleErrors(returnValue, callback);
    });
};

exports.getStoryTypesObj = function(callback) {
    log.debug("getStoryTypesObj");
    storyDao.getStoryTypesObj(callback);
};

exports.getStories = function(pid, callback) {
    log.debug("getStories");
    storyDao.getStories(pid, callback);
};

exports.getStoriesNTasks = function(pid, callback) {
    log.debug("getStoriesNTasks");
    storyDao.getStoriesNTasks(pid, callback);
};

exports.getStory = function(id, callback) {
    log.debug("getStory");
    storyDao.getStory(id, callback);
};