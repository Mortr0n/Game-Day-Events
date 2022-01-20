const jwt = require("jsonwebtoken");

module.exports.secret = process.env.JWT_SECRET
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, 
        // once we compare the unhashed version of the cookie, run this callback function
        (err, payload) => {
        if(err) {
            // this is not a valid token OR the cookie doesn't exist
            res.status(401).json({ verified: false });
        } else {
            // err is null so it verified correctly
            console.log("good to proceed!")
            next();
        }
    });
}