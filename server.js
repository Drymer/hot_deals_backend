const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
var cors = require('cors')
const app = express();
require("./db.js");

require("./services/passport")(passport);
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.use("/", require("./routes/userRoutes"));

// set port, listen for requests
const PORT = 3000 || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});