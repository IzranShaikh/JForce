const express = require('express');
const router = express.Router();
// const { authCheck } = require('../helper/jwt_helper');
//controllers
const voteC = require('../controllers/VoteC');
const session = require('express-session');

//session setup
router.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true
}));

////routes
router.get('/', (req, res) => {
    const user = req.session.user;
    const voted = req.session.voted;
    if (!user)
        res.send("Unauthorized");
    res.render('voting', { user:user, voted:voted });
}); //admin checks results

router.post('/', express.json(), voteC.vote); //user vote

module.exports = router;