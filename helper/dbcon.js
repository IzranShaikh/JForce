const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect("mongodb+srv://" + process.env.DBUSER + ":" + process.env.DBPASS + "@personalcluster.73asn.mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority");
