/**
 * logger.js
 */
var log4js = require('log4js'),
    commonPror = require("../../config.json").logger,
    logger;


log4js.configure({
    appenders: [{
        type: commonPror.logAppender,
        filename: commonPror.logFilename,
        category: commonPror.Category,
        maxLogSize: commonPror.maxLogSize,
        backups: commonPror.backups
    }]
});

logger = log4js.getLogger(commonPror.Category);
logger.setLevel(commonPror.logLevel);

exports.logger = function(name) {
    logger = log4js.getLogger(name);
    return logger;
};