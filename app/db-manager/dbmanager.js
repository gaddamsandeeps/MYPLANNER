/**
 * dbmanager.js
 * get connection
 */
exports.getConnection = function() {
    return require("./connection").getConnection();
}