var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    controller = require("../app/controllers/controller"),
    properties = require("../properties.json");

passport.serializeUser(function(user, done) {
    done(null, user);
});


passport.deserializeUser(function(user, done) {
    if (user) {
        done(null, user);
    } else {
        done(new Error('User  does not exist'));
    }
});


passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, function(username, password, done) {
    process.nextTick(function() {
        controller.auth(username, password, function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Login failed  for ' + username
                });
            } else {
                return done(null, user);

            }
        });
    });
}));

module.exports = passport;
