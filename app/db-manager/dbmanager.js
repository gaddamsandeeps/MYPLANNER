/**
 * dbmanager.js
 * get connection
 */
exports.getPool = function() {
    return require("./connection").getPool();
};
