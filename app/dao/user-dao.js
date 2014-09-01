/**
 * CURD operations on users
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    teamResourceDao = require("./team-resource-dao"),
    log = require('../logger/logger').logger("user-dao");


exports.getUsersAvailabilityTeamId = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            getUsersAvailabilityTeamIdSQL = queries.user.getUsersAvailabilityTeamId;

        connection.query(getUsersAvailabilityTeamIdSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUser = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getUserSQL = queries.user.getUser;

        connection.query(getUserSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserByName = function(userName, callback) {
    try {
        var connection = db.getConnection(),
            getUserByNameSQL = queries.user.getUserByName;

        connection.query(getUserByNameSQL, userName, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getUserById = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getUserByIdSQL = queries.user.getUserById;

        connection.query(getUserByIdSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getTeamUsers = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getTeamUsersSQL = queries.user.getTeamUsers;

        connection.query(getTeamUsersSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getNonTeamUsers = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getNonTeamUsersSQL = queries.user.getNonTeamUsers;

        connection.query(getNonTeamUsersSQL, userId, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.getLeads = function(callback) {
    try {
        var connection = db.getConnection(),
            getLeadsSQL = queries.user.getLeads;

        connection.query(getLeadsSQL, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.auth = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            authUserSQL = queries.user.authUser;

        connection.query(authUserSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.contactExist = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            contactExistSQL = queries.user.contactExist;

        connection.query(contactExistSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows[0]);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.userExist = function(uName, callback) {
    try {
        var connection = db.getConnection(),
            userExistSQL = queries.user.userExist;

        connection.query(userExistSQL, uName, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.saveUser = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            saveUserProSQL = queries.user.saveUserPro;

        connection.query(saveUserProSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editUser = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            editUserDetailsProSQL = queries.user.editUserDetailsPro;

        connection.query(editUserDetailsProSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};

exports.editPassword = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            editPasswordSQL = queries.user.editPassword;

        connection.query(editPasswordSQL, obj, function(err, rows) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(rows);
            }
        });
    } catch (e) {
        log.error(e);
    }
};