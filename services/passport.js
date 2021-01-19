const User = require("../models/user");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { msg: "Incorrect username" });
                }
                if (user.password !== password) {
                    return bcrypt.compare(password, user.password, (err, res) => {
                        if (res) {
                            return done(null, user);
                        } else {
                            return done(null, false, { msg: "Incorrect password" });
                        }
                    });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
