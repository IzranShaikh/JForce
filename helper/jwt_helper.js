////////// GOT CANCELLED


const jwt = require('jsonwebtoken');

//AuthCheck Middleware
const authCheck = (req, res, next) => {
    try {
        const encodedToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(encodedToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        if (err.name == "TokenExpiredError") {
            res.status(401).json({ "message": "Token Expired" });
        } else {
            res.status(403).json({ "message": "Authentication Failure" });
        }
        
    }
};

//Generate Tokens
const signToken = (payload, secret, expiresIn) => {
    let token = jwt.sign(
        payload,
        secret,
        {
            expiresIn: expiresIn
        } //options
    );
    return token;
}

module.exports = { authCheck, signToken };