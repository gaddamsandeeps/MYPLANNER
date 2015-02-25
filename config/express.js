/**
 * Module dependencies.
 */
var express = require('express'),
    flash = require('connect-flash'),
    path = require('path');
//var helpers = require('view-helpers');

var config = require("./config");


module.exports = function(app, passport) {
    console.log('Initializing Express');

    //ejs
    var pbc = path.join(__dirname, '../public/');
    app.use(express.static(pbc));
    //Set views path, template engine and default layout
    app.set('views', pbc);
    app.engine('html', require('ejs').renderFile);

    app.set('showStackError', true);

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(express.favicon('public/images/favicon.ico'));

    //Don't use logger for test env
    // if (process.env.NODE_ENV !== 'test') {
    //     app.use(express.logger('dev'));
    // }



    //Enable jsonp
    //app.enable("jsonp callback");

    app.configure(function() {
        //cookieParser should be above session
        app.use(express.cookieParser());

        // request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        //express/mongo session storage
        app.use(express.cookieSession({
            secret: config.session.key,
            cookie: {
                maxAge: config.session.maxAge
            }
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        //app.use(helpers(config.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
        app.use(app.router);

        //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500.html', {
                error: err.stack
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404.html', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};
