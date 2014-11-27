/**
 * CURD operations on roles
 */
var pool = require("../db-manager/dbmanager").getPool(),
    queries = require("../sql/sql.json"),
    log = require('../logger/logger').logger("role-dao");

exports.getRoles = function(callback) {
    try {
        var getRolesSQL = queries.role.getRoles;

        pool.getConnection(function(err, connection) {
            connection.query(getRolesSQL, function(err, rows) {
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


exports.getRole = function(userId, callback) {
    try {
        var getRoleSQL = queries.role.getRole;

        pool.getConnection(function(err, connection) {
            connection.query(getRoleSQL, userId, function(err, rows) {
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

exports.getRoleByUserName = function(name, callback) {
    try {
        var getRoleByUserNameSQL = queries.role.getRoleByUserName;

        pool.getConnection(function(err, connection) {
            connection.query(getRoleByUserNameSQL, name, function(err, rows) {
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

exports.saveRole = function(obj, callback) {
    try {
        var saveRoleSQL = queries.role.saveRole;

        pool.getConnection(function(err, connection) {
            connection.query(saveRoleSQL, obj, function(err, rows) {
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

exports.editRole = function(obj, callback) {
    try {
        var editRoleSQL = queries.role.editRole;

        pool.getConnection(function(err, connection) {
            connection.query(editRoleSQL, obj, function(err, rows) {
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

exports.removeRole = function(obj, callback) {
    try {
        var removeRoleSQL = queries.role.removeRole;

        pool.getConnection(function(err, connection) {
            connection.query(removeRoleSQL, obj, function(err, rows) {
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