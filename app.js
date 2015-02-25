/**
 * app.js
 *
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    d = require('domain').create();

// Load Configurations

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var passport = require('./config/passport'),
    config = require("./config/config");


var app = express();

var port = config.port;

// all environments
app.set('port', port);

//Initialize Express
require('./config/express')(app, passport);

//Initialize Routes
require('./config/routes').init(app, passport);

//Initialize pages
//require('./pages').init(app, passport);

d.on('error', function(err) {
    console.log("Caught with some error : " + err)
})

d.run(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.log(config.appname + " " + config.app.description);
        console.log('Express server listening on port ' + app.get('port'));
    });
});

//expose app
exports = module.exports = app;
