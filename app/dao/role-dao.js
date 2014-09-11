/**
 * CURD operations on roles
 */
var db = require("../db-manager/dbmanager"),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("role-dao");

exports.getRoles = function(callback) {
    try {
        var connection = db.getConnection(),
            getRolesSQL = queries.role.getRoles;

        connection.query(getRolesSQL, function(err, rows) {
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


exports.getRole = function(userId, callback) {
    try {
        var connection = db.getConnection(),
            getRoleSQL = queries.role.getRole;

        connection.query(getRoleSQL, userId, function(err, rows) {
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

exports.getRoleByUserName = function(name, callback) {
    try {
        var connection = db.getConnection(),
            getRoleByUserNameSQL = queries.role.getRoleByUserName;

        connection.query(getRoleByUserNameSQL, name, function(err, rows) {
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

exports.saveRole = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            saveRoleSQL = queries.role.saveRole;
        connection.query(saveRoleSQL, obj,
            function(err, rows) {
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
    } catch (e) {
        log.error(e);
    }
};

exports.editRole = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            editRoleSQL = queries.role.editRole;
        connection.query(editRoleSQL, obj,
            function(err, rows) {
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
    } catch (e) {
        log.error(e);
    }
};

exports.removeRole = function(obj, callback) {
    try {
        var connection = db.getConnection(),
            removeRoleSQL = queries.role.removeRole;
        connection.query(removeRoleSQL, obj,
            function(err, rows) {
                if (err) {
                    log.error(err);
                    callback(err);
                } else {
                    callback(rows.insertId);
                }
            });
    } catch (e) {
        log.error(e);
    }
};