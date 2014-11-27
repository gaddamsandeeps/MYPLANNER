/**
 * CURD operations on users
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    teamResourceDao = require("./team-resource-dao"),
    log = require('../logger/logger').logger("user-dao");


exports.getUsersAvailabilityTeamId = function(obj, callback) {
    try {
        var getUsersAvailabilityTeamIdSQL = queries.user.getUsersAvailabilityTeamId;

        pool.getConnection(function(err, connection) {
            connection.query(getUsersAvailabilityTeamIdSQL, obj, function(err, rows) {
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

exports.getUser = function(userId, callback) {
    try {
        var getUserSQL = queries.user.getUser;

        pool.getConnection(function(err, connection) {
            connection.query(getUserSQL, userId, function(err, rows) {
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

exports.getUserByName = function(userName, callback) {
    try {
        var getUserByNameSQL = queries.user.getUserByName;

        pool.getConnection(function(err, connection) {
            connection.query(getUserByNameSQL, userName, function(err, rows) {
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

exports.getUserById = function(userId, callback) {
    try {
        var getUserByIdSQL = queries.user.getUserById;

        pool.getConnection(function(err, connection) {
            connection.query(getUserByIdSQL, userId, function(err, rows) {
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

exports.getTeamUsers = function(userId, callback) {
    if (userId) {
        try {
            var getTeamUsersSQL = queries.user.getTeamUsers;

            pool.getConnection(function(err, connection) {
                connection.query(getTeamUsersSQL, userId, function(err, rows) {
                    connection.release();
                    if (err) {
                        e
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
    } else {
        callback([]);
    }
};

exports.getNonTeamUsers = function(userId, callback) {
    try {
        var getNonTeamUsersSQL = queries.user.getNonTeamUsers;

        pool.getConnection(function(err, connection) {
            connection.query(getNonTeamUsersSQL, userId, function(err, rows) {
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

exports.getLeads = function(callback) {
    try {
        var getLeadsSQL = queries.user.getLeads;

        pool.getConnection(function(err, connection) {
            connection.query(getLeadsSQL, function(err, rows) {
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

exports.auth = function(obj, callback) {
    try {
        var authUserSQL = queries.user.authUser;

        pool.getConnection(function(err, connection) {
            connection.query(authUserSQL, obj, function(err, rows) {
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

exports.contactExist = function(obj, callback) {
    try {
        var contactExistSQL = queries.user.contactExist;

        pool.getConnection(function(err, connection) {
            connection.query(contactExistSQL, obj, function(err, rows) {
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

exports.userExist = function(uName, callback) {
    try {
        var userExistSQL = queries.user.userExist;

        pool.getConnection(function(err, connection) {
            connection.query(userExistSQL, uName, function(err, rows) {
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

exports.saveUser = function(obj, callback) {
    try {
        var saveUserProSQL = queries.user.saveUserPro;

        pool.getConnection(function(err, connection) {
            connection.query(saveUserProSQL, obj, function(err, rows) {
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

exports.editUser = function(obj, callback) {
    try {
        var editUserDetailsProSQL = queries.user.editUserDetailsPro;

        pool.getConnection(function(err, connection) {
            connection.query(editUserDetailsProSQL, obj, function(err, rows) {
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

exports.editPassword = function(obj, callback) {
    try {
        var editPasswordSQL = queries.user.editPassword;

        pool.getConnection(function(err, connection) {
            connection.query(editPasswordSQL, obj, function(err, rows) {
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