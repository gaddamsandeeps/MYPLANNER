/**
 * CURD operations on Story
 */
var async = require("async"),
    pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    taskDao = require("../dao/task-dao"),
    iterationDao = require("../dao/iteration-dao"),
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
                    module.exports.getStory(rows.insertId, function(res) {
                        callback(res);
                    });
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editStory = function(obj, sid, callback) {
    try {
        var editStorySQL = queries.story.editStory;

        pool.getConnection(function(err, connection) {
            connection.query(editStorySQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    module.exports.getStory(sid, function(res) {
                        callback(res);
                    });
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

exports.removeStory = function(obj, sid, callback) {
    try {
        var removeStorySQL = queries.story.removeStory;

        pool.getConnection(function(err, connection) {
            connection.query(removeStorySQL, obj, function(err, rows) {
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

exports.moveToNextIteration = function(obj, callback) {
    try {
        var moveToNextIterationSQL = queries.story.moveToNextIteration;

        pool.getConnection(function(err, connection) {
            connection.query(moveToNextIterationSQL, obj, function(err, rows) {
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

exports.addStoryComment = function(obj, callback) {
    try {
        var addStoryCommentSQL = queries.story.addStoryComment;

        pool.getConnection(function(err, connection) {
            connection.query(addStoryCommentSQL, obj, function(err, rows) {
                connection.release();
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    getStoryCommentByCommentId(rows.insertId, callback);
                }
            });
        });
    } catch (e) {
        log.error(e);
    }
};

var getStoryCommentByCommentId = function(sid, callback) {
    try {
        var getStoryCommentByCommentIdSQL = queries.story.getStoryCommentByCommentId;

        pool.getConnection(function(err, connection) {
            connection.query(getStoryCommentByCommentIdSQL, sid, function(err, rows) {
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

exports.getStoryCommentsById = function(sid, callback) {
    try {
        var getStoryCommentsByIdSQL = queries.story.getStoryCommentsById;

        pool.getConnection(function(err, connection) {
            connection.query(getStoryCommentsByIdSQL, sid, function(err, rows) {
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

        getDetailedStoriesNTasks(getStoriesSQL, pid, callback);
    } catch (e) {
        log.error(e);
    }
};


exports.getStoriesNTasks = function(pid, callback) {
    try {
        var getStoriesNTasksSQL = queries.story.getStoriesNTasks;

        getDetailedStoriesNTasks(getStoriesNTasksSQL, pid, callback);

    } catch (e) {
        log.error(e);
    }
};

exports.getStoriesNTasksByPidnIterId = function(obj, callback) {
    try {
        var sql = (obj[1] == 0) ? queries.story.getStoriesNTasks : queries.story.getStoriesNTasksIdsByPidnIterId;

        getDetailedStoriesNTasks(sql, obj, callback);
    } catch (e) {
        log.error(e);
    }
};

exports.getInCompleteStoriesNTasksByPidnIterId = function(obj, callback) {
    try {
        var getInCompleteStoriesNTasksByPidnIterIdSQL = queries.story.getInCompleteStoriesNTasksByPidnIterId;

        getDetailedStoriesNTasks(getInCompleteStoriesNTasksByPidnIterIdSQL, obj, callback);
    } catch (e) {
        log.error(e);
    }
};

exports.getStoriesNTasks = function(pid, callback) {
    try {
        var getStoriesNTasksSQL = queries.story.getStoriesNTasks;
        getDetailedStoriesNTasks(getStoriesNTasksSQL, pid, callback);
    } catch (e) {
        log.error(e);
    }
};

exports.getStory = function(id, callback) {
    try {
        var getStorySQL = queries.story.getStory;

        getDetailedStoriesNTasks(getStorySQL, id, function(rows) {
            callback(rows[0])
        });
    } catch (e) {
        log.error(e);
    }
};

var getDetailedStoriesNTasks = function(sql, obj, callback) {

    async.series({
            maxtaskstatus: function(callback) {
                getMaxTaskStatus(function(res) {
                    callback(null, res);
                });
            }
        },
        function(err, results) {
            var maxtaskstatus = results.maxtaskstatus;
            pool.getConnection(function(err, connection) {
                connection.query(sql, obj, function(err, val) {
                    connection.release();
                    if (err) {
                        log.error(err);
                        callback(err);
                    } else {
                        var stories = new Array();
                        if (val.length > 0) {
                            for (var i = 0; i < val.length; i++) {
                                getDetailedStory(val[i].id, maxtaskstatus, function(story) {
                                    stories.push(story);
                                    if (stories.length === val.length) {
                                        callback(stories);
                                    }
                                });
                            }
                        } else {
                            callback([]);
                        }
                    }
                });
            });
        });
};


var getDetailedStory = function(id, maxtaskstatus, finalcallback) {
    try {
        var getDetailedStorySQL = queries.story.getDetailedStory;

        async.series({
                story: function(callback) {
                    pool.getConnection(function(err, connection) {
                        connection.query(getDetailedStorySQL, id, function(err, rows) {
                            connection.release();
                            if (err) {
                                log.error(err);
                                callback(err);
                            } else {
                                callback(null, rows[0]);
                            }
                        });
                    });
                },
                tasks: function(callback) {
                    taskDao.getTasks(id, function(tasks) {
                        callback(null, tasks);

                    });
                },
                totalTaksHrs: function(callback) {
                    getTasksTotalHrsByStoryId(id, function(hrs) {
                        callback(null, hrs);

                    });
                },
                getStoryStatusByStoryId: function(callback) {
                    getStoryStatusByStoryId(id, function(count) {
                        callback(null, count);
                    });
                },
                comments: function(callback) {
                    module.exports.getStoryCommentsById(id, function(res) {
                        callback(null, res);
                    });
                }
            },
            function(err, results) {
                var story = results.story,
                    tasks = results.tasks,
                    storyStatus = results.getStoryStatusByStoryId,
                    totalTaksHrs = results.totalTaksHrs,
                    comments = results.comments;

                story.comments = comments;

                //story check
                if (story.storytypeid === 1) {
                    story.tasks = tasks;
                    story.progress = storyStatus.count;
                    story.hours = totalTaksHrs.hours;
                    story.tasklength = tasks.length;
                } else {
                    story.progress = (story.status == maxtaskstatus) ? 0 : 1;
                }
                finalcallback(story);

            });


    } catch (e) {
        log.error(e);
    }
};

var getMaxTaskStatus = function(callback) {
    var getMaxTaskStatusSQL = queries.story.getMaxTaskStatus;

    pool.getConnection(function(err, connection) {
        connection.query(getMaxTaskStatusSQL, function(err, rows) {
            connection.release();
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0].id);
            }
        });
    });
}

var getTasksTotalHrsByStoryId = function(sid, callback) {
    try {
        var getTasksTotalHrsByStoryIdSQL = queries.story.getTasksTotalHrsByStoryId;

        pool.getConnection(function(err, connection) {
            connection.query(getTasksTotalHrsByStoryIdSQL, sid, function(err, rows) {
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

var getStoryStatusByStoryId = function(sid, callback) {
    try {
        var getStoryStatusByStoryIdSQL = queries.story.getStoryStatusByStoryId;

        pool.getConnection(function(err, connection) {
            connection.query(getStoryStatusByStoryIdSQL, sid, function(err, rows) {
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
