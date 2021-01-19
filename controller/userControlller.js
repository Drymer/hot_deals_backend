const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.user_login_post = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.json({ message: info.message }) };
        res.json({ message: "success" })
    })(req, res, next);
};

exports.user_signup_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        }).save((err) => {
            if (err) {
                return next(err);
            }
            res.json({ message: "User created" });
        });
    });
};
