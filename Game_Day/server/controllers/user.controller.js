const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Event = require('../models/event.model');

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

    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then((userRecord) => {
            // check if returned object is null
            if(userRecord === null) {
                // email not found in the collection
                res.status(400).json({
                    message: "invalid login attempt"
                });
            } else {
                console.log("record found")
                // email found compare password given with the one in the db
                bcrypt.compare(req.body.password, userRecord.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid) {
                            console.log("good to go!");
                            res.cookie("usertoken",// name of the cookie 
                                jwt.sign({
                                    // payload is the data that I want saved to the cookie
                                    user_id: userRecord._id,
                                    userFirstName: userRecord.firstName,
                                    userLastName: userRecord.lastName
                                },
                                process.env.JWT_SECRET), // used to sign/hash the data in the cookie
                                {
                                    // configuration for the cookie
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 90000000)
                                }
                            ).json({
                                message: "Success!",
                                userFirstName: userRecord.firstName,
                                userLastName: userRecord.lastName
                            })
                        } else {
                            console.log("else")
                            // passwords don't match
                            res.status(400).json({
                                message: "invalid login attempt"
                            })
                            .catch((err) => {
                                console.log("comparison invalid")
                                res.status(400).json({
                                    message: "Invalid Login attempt"
                                })
                            })
                            .catch((err) => {
                                console.log("error with findOne")
                                res.status(400).json({
                                    message: "invalid login"
                                })
                            })
                        }
                    })
            }
        })
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

    deleteOneUser: (req, res) => {
        User.findByIdAndDelete({ _id: req.params.id})
            .then((deletedUser) => {
                console.log(deletedUser);
                res.json(deletedUser);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    getLoggedInUser: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload.user_id)
            .populate ({
                    path: "eventsAttending",
                    model: "Event"
                })
            .then((user) => {
                console.log(user);
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })
    },

    // pull for unjoin remove all instances of id from the arrays
    joinOneEvent: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
        const thisUserId = decodedJWT.payload.user_id;
        const eventId = req.body;
            User.findByIdAndUpdate(
            // using the User object to push the ev
                { _id: thisUserId},
                {
                    $addToSet: { eventsAttending: eventId.id }
                },
                {
                    new: true,
                    useFindAndModify: false
                })
                    .populate({
                        path: "eventsAttending",
                        model: "User"
                    })
                    .then((updatedUser) => {
                        console.log(updatedUser);
                        res.json(updatedUser);
                        Event.findByIdAndUpdate(
                            { _id: eventId.id },
                            {
                                $addToSet: { attendees: thisUserId }
                            },
                            {
                                new: true,
                                useFindAndModify: false
                            }
                        )
                        .populate({
                            path: "attendees",
                            model: "Event",
                        })
                        .then((updatedEvent) => {
                            console.log(updatedEvent);
                            res.json(updatedEvent);
                        })
                        .catch((err) => {
                            console.log(`Error in updating Event ${err}`);
                        })
                    })
                    .catch((err) => {
                        console.log(`Error in updating User ${err}`);
                    })
    },
    
}