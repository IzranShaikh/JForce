const express = require('express');
const router = express.Router();
const session = require('express-session');
const { authCheck } = require('../helper/jwt_helper');
//controllers
const authC = require('../controllers/AuthC');



////routes
//register
router.get('/register', (req, res) => {
    if (!req.session.user)
        res.render('register', { message:null });
    else
        res.send("Already Logged In")
}) // FRONT
router.post('/register', express.json(), authC.reg); // BACK
//login
router.get('/login', (req, res) => {
    if (!req.session.user)
        res.render('login', { message: null });
    else
        res.redirect('/vote');
}) // FRONT
router.post('/login', authC.login); // BACK
//logout
router.get('/logout', authC.logout); //logout
router.get('/admin', authC.admin)

module.exports = router;