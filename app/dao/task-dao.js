/**
 * CURD operations on Story
 */
var pool = require("../db-manager/dbmanager").getPool(),
    async = require("async"),
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
                    //module.exports.updateStoryHours(obj[3], 0, obj[1]);
                    //callback(rows.insertId);
                    module.exports.getTask(rows.insertId, function(res) {
                        callback(res);
                    });
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editTask = function(obj, id, callback) {
    try {
        var editTaskSQL = queries.task.editTask;

        pool.getConnection(function(err, connection) {
            connection.query(editTaskSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    //module.exports.updateStoryHours(obj[2], obj[5], obj[6]);
                    //callback(rows.insertId);
                    module.exports.getTask(id, function(res) {
                        callback(res);
                    });
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeTask = function(obj, id, callback) {
    try {
        var removeTaskSQL = queries.task.removeTask;

        pool.getConnection(function(err, connection) {
            connection.query(removeTaskSQL, obj, function(err, rows) {
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

exports.changeTaskStatus = function(obj, type, callback) {
    try {
        var changeTaskStatusSQL = (type === '2') ? queries.story.changeDefectStatus : queries.task.changeTaskStatus;

        pool.getConnection(function(err, connection) {
            connection.query(changeTaskStatusSQL, obj, function(err, rows) {
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

exports.addTaskComment = function(obj, callback) {
    try {
        var addTaskCommentSQL = queries.task.addTaskComment;

        pool.getConnection(function(err, connection) {
            connection.query(addTaskCommentSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                    getTaskCommentByCommentId(getTaskCommentByCommentId, callback);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

var getTaskCommentByCommentId = function(cid, callback) {
    try {
        var getTaskCommentByCommentIdSQL = queries.task.getTaskCommentByCommentId;

        pool.getConnection(function(err, connection) {
            connection.query(getTaskCommentByCommentIdSQL, cid, function(err, rows) {
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
}

exports.getTaskCommentsById = function(tid, callback) {
    try {
        var getTaskCommentsByIdSQL = queries.task.getTaskCommentsById;

        pool.getConnection(function(err, connection) {
            connection.query(getTaskCommentsByIdSQL, tid, function(err, rows) {
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
}


//not used any where
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


exports.getDetailedTasks = function(tid, finalcallback) {
    try {
        var getTaskSQL = queries.task.getTask;

        async.series({
                tasks: function(callback) {
                    module.exports.getTask(tid, function(res) {
                        callback(null, res);
                    });
                },
                comments: function(callback) {
                    module.exports.getTaskCommentsById(tid, function(res) {
                        callback(null, res);
                    });
                }
            },
            function(err, results) {
                var tasks = results.tasks,
                    comments = results.comments;

                tasks.comments = comments;
                finalcallback(tasks);

            });


    } catch (e) {
        log.error(e);
    }

};

exports.getInCompleteTasks = function(sid, callback) {
    try {
        var getInCompleteTasksSQL = queries.task.getInCompleteTasks;

        pool.getConnection(function(err, connection) {
            connection.query(getInCompleteTasksSQL, sid, function(err, rows) {
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
            connection.query(updateStoryHoursSQL, [currentTaskHrs, prevTaskHrs, storyId], function(err, rows) {
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

exports.getTaskStatuses = function(callback) {
    try {
        var getTaskStatusesSQL = queries.taskstatus.getTaskStatuses;

        pool.getConnection(function(err, connection) {
            connection.query(getTaskStatusesSQL, function(err, rows) {
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
