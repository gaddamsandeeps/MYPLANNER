/**
 * CURD operations on Story
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("story-dao");

exports.saveStory = function(obj, callback) {
    try {
        var saveStorySQL = queries.story.saveStory;

        pool.getConnection(function(err, connection) {
            connection.query(saveStorySQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editStory = function(obj, callback) {
    try {
        var editStorySQL = queries.story.editStory;

        pool.getConnection(function(err, connection) {
            connection.query(editStorySQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeStory = function(id, callback) {
    try {
        var removeStorySQL = queries.story.removeStory;

        pool.getConnection(function(err, connection) {
            connection.query(removeStorySQL, id, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.storyCompleted = function(id, callback) {
    try {
        var storyCompletedSQL = queries.story.storyCompleted;

        pool.getConnection(function(err, connection) {
            connection.query(storyCompletedSQL, id, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getStoryTypesObj = function(callback) {
    try {
        var getStoryTypesObjSQL = queries.story.getStoryTypesObj;

        pool.getConnection(function(err, connection) {
            connection.query(getStoryTypesObjSQL, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getStories = function(pid, callback) {
    try {
        var getStoriesSQL = queries.story.getStories;

        pool.getConnection(function(err, connection) {
            connection.query(getStoriesSQL, pid, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};


exports.getStoriesNTasks = function(pid, callback) {
    try {
        var getStoriesNTasksSQL = queries.story.getStoriesNTasks;

        pool.getConnection(function(err, connection) {
            connection.query(getStoriesNTasksSQL, pid, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getStory = function(id, callback) {
    try {
        var getStorySQL = queries.story.getStory;

        pool.getConnection(function(err, connection) {
            connection.query(getStorySQL, id, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows[0]);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};