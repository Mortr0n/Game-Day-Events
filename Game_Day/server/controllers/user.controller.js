const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET);
                // original way before JWT cookie
                // res.json({ msg: "success!", user: user });
                // Make sure the third item points to the secret KEY!!!!
                res.cookie("usertoken", userToken, process.env.JWT_SECRET, {
                    httpOnly: true
                })
                .json({ msg: "Success!", user: user });
            })
            .catch((err) => res.status(400).json(err));
    },

    // TODO: Platform way below!  If it doesn't work try video way!
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user === null) {
            // email not found in users collection
            return res.status(400).json({
                msg: "invalid login attempt"
            });
        }

        // Found a user with this email address
        // compare supplied pw with the hashed pw in the DB
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if(!correctPassword) {
            // password was not a match!
            return res.status(400).json({
                msg: "passwords do not match!"
            });
        }

        // if we made it this far, the pw was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        // note that the response object allows chained calls to cookie and json
        res.cookie("usertoken", userToken, process.env.JWT_SECRET, 
        {
            httpOnly: true, //can only be passed using http requests
            expires: new Date(Date.now() + 90000000) //expiration set
        }).json({
            msg: "success!"
        });
    },
    
    logout: (req, res) => {
        console.log("logging out")
        res.clearCookie('usertoken'); // same name as above for saving the cookie
        res.sendStatus(200).json({
            msg: "You have successfully logged out!"
        });
    },
    // FIXME: Remove this before going live
    getAll: (req, res) => {
        User.find()
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
            .catch((err) => res.status(400).json(err));
    },

}