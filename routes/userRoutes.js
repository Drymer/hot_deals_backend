const express = require("express");
const router = express.Router();

const userController = require("../controller/userControlller");

router.post('/login', userController.user_login_post);
router.post("/signup", userController.user_signup_post);

module.exports = router;
