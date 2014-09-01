/**
 * create connection
 */
var mysql = require('mysql'),
    dbConfig = require("../../config.json").db_config,
    log = require('../logger/logger').logger("connection"),
    host = dbConfig.host,
    dbPort = dbConfig.port,
    dbName = dbConfig.dbName,
    uName = dbConfig.uName,
    pwd = dbConfig.pwd,
    connection = null,
    databaseUrl = "" + uName + ":" + pwd + "@" + host + ":" + dbPort + "/" + dbName;

var openConnection = function() {
    if (connection == null) {
        log.info("DB Connection Created.");
        connection = mysql.createConnection({
            host: host,
            user: uName,
            port: dbPort,
            password: pwd,
            database: dbName
        });
        connection.connect();
    }

    return connection;
}

exports.getConnection = function() {
    return openConnection();
}

exports.closeConnection = function() {
    openConnection().end(function(err) {
        // Do something after the connection is gracefully terminated.
    });
}