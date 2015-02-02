/**
 * CURD operations on Story
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("task-dao");

exports.saveTask = function(obj, callback) {
    try {
        var saveTaskSQL = queries.task.saveTask;

        pool.getConnection(function(err, connection) {
            connection.query(saveTaskSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    //Previous hours will be zero for new tasks
                    module.exports.updateStoryHours(obj[3], 0, obj[1]);
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editTask = function(obj, callback) {
    try {
        var editTaskSQL = queries.task.editTask;

        pool.getConnection(function(err, connection) {
            connection.query(editTaskSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    module.exports.updateStoryHours(obj[2], obj[5],obj[6]);
                    callback(rows.insertId);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeTask = function(id, callback) {
    try {
        var removeTaskSQL = queries.task.removeTask;

        pool.getConnection(function(err, connection) {
            connection.query(removeTaskSQL, id, function(err, rows) {
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

exports.taskCompleted = function(id, callback) {
    try {
        var taskCompletedSQL = queries.task.taskCompleted;

        pool.getConnection(function(err, connection) {
            connection.query(taskCompletedSQL, id, function(err, rows) {
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

exports.removeTasksByStoryId = function(sid, callback) {
    try {
        var removeTasksSQL = queries.task.removeTasks;

        pool.getConnection(function(err, connection) {
            connection.query(removeTasksSQL, sid, function(err, rows) {
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

exports.getTasks = function(sid, callback) {
    try {
        var getTasksSQL = queries.task.getTasks;

        pool.getConnection(function(err, connection) {
            connection.query(getTasksSQL, sid, function(err, rows) {
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


exports.getTask = function(id, callback) {
    try {
        var getTaskSQL = queries.task.getTask;

        pool.getConnection(function(err, connection) {
            connection.query(getTaskSQL, id, function(err, rows) {
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


exports.updateStoryHours = function(currentTaskHrs, prevTaskHrs, storyId) {

    try {
        var updateStoryHoursSQL = queries.task.updateStoryHours;

        pool.getConnection(function(err, connection) {
            connection.query(updateStoryHoursSQL, [currentTaskHrs, prevTaskHrs, storyId] , function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                }                                     
            });
        });
    } catch (e) {
        log.error(e);
    }
};
