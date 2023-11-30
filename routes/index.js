const express = require("express");
const router = express.Router();
const session = require('express-session');
// importing routes
const authRoute = require("./AuthR");
const voteRoute = require("./VoteR");

// using routes

router.use("/auth", authRoute);
router.use("/vote", voteRoute);
router.get('/', (req, res) => res.redirect('/auth/login'));

// exporting router
module.exports = router;