/**
 * connection.js
 * create connection
 */
var mysql = require('mysql'),
    dbConfig = require("../../config/config").db_config,
    log = require('../logger/logger').logger("connection"),
    host = dbConfig.host,
    dbPort = dbConfig.port,
    dbName = dbConfig.dbName,
    uName = dbConfig.uName,
    pwd = dbConfig.pwd,
    connectionLimit = dbConfig.connectionLimit,
    connection = null,
    databaseUrl = "" + uName + ":" + pwd + "@" + host + ":" + dbPort + "/" + dbName;

exports.getPool = function() {
    var pool = mysql.createPool({
        connectionLimit: connectionLimit,
        host: host,
        user: uName,
        port: dbPort,
        password: pwd,
        database: dbName
    });

    return pool;
}
