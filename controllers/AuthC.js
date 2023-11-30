// const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Auth, Votes } = require('../models/');
// const { signToken } = require('../helper/jwt_helper'); CANCELLED COZ TOKENS

//register
const reg = async (req, res) => {
    const { username, password, phone, email } = req.body;
    if (!username || !password || !phone || !email) {
        return res.redirect('/auth/register');
    }
    await Auth.findOne({ username: username })
        .then(user => {
            if (user)
                res.render('register', { "message": "Account already exists" });
            else {
                const user_ = new Auth({
                    username: username,
                    password: password,
                    phone: phone,
                    email: email,
                    admin: false,
                    voted: false
                });
                user_.save()
                    .then(r => {
                        res.redirect('/auth/login');
                    })
            }
        })
        .catch(e => res.status(500).send("Server Error"));
};

//login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/auth/login');
    }
    await Auth.findOne({ username: username, password: password })
        .then(user => {
            if (!user)
                return res.render('login', {message:'Invalid Credentials'});
            //valid login
            req.session.user = username;
            req.session.voted = user.voted;
            res.locals.user = req.session.user;
            if (user.admin)
                res.redirect('/auth/admin');
            else
                res.redirect('/vote');
        });
};

//refresh token - CANCELLED / MUST USE SESSION
// const refresh = async (req, res) => {
//     const refreshToken = req.body.token;
//     if (refreshToken == null) return res.sendStatus(401);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = signToken({ email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET, '1h');
//         return res.json(accessToken);
//     })
// };

//logout
const logout = async (req, res) => {
    // await Auth.updateOne({ email: req.user.email }, { refreshToken: null }); // CANCELLED
    if (!req.session.user)
        res.send("You must login first");
    else
        req.session.destroy();
        res.redirect("/");
}

const admin = async (req, res) => {
    const user = req.session.user;
    if (!user)
        res.send("Unauthorized");
    else
        await Votes.findOne()
            .then(result => {
                res.render('admin', { user, result });
            })
            .catch(e => res.redirect('/'));
};

module.exports = { reg, login, logout, admin };