require('./helper/dbcon');
const express = require('express');
const app = express();
const routes = require('./routes');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

//Client Access Overrides <=> CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(express.json({ limit: '50mb' }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "sosecret",
    saveUninitialized: false,
    resave: false
  }));
  // middleware to make 'user' available to all templates
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

//Routes
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App running on port " + port));