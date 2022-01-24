const { response } = require('express');
const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');
const { populate } = require('../models/event.model');


module.exports = {
    // FIXME: remove this later
    index: (req, res) => {
        res.json({ message: "Howdy"});
    },

    createEvent: (req, res) => {
        // create event using the req.body from the post
        const event = new Event(req.body);
        // decoding the JWT so that I can get access to the user info
        const decodedJWT = jwt.decode(req.cookies.usertoken, 
            { complete: true });
        // assign the userId from event model to the decoded user_id from the cookie
        event.userId = decodedJWT.payload.user_id;
        // pass in the new event instead of the req.body
        Event.create(event)
            .then((newEvent) => {
                console.log(`Created Event ${newEvent}`);
                res.json(newEvent);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    getAllEvents: (req, res) => {
        Event.find()
            .then((allEvents) => {
                console.log(`Event List ${allEvents}`);
                res.json(allEvents);
            })
            .catch((err) => res.status(400).json(err));
    },

    getOneEvent: (req, res) => {
        Event.findOne({ _id: req.params.id })
        // use populate to grab the user from the id and the comments for the event            
            .populate({path: "comments",
                model: "Comment",
                populate: {
                    path: "userId",
                    model: "User"
                }
            })
            .populate("userId")
            .sort({createdAt: "descending"})
            .then((foundEvent) => {
                console.log(`Found Event ${foundEvent}`);
                res.json(foundEvent);
            })
            .catch((err) => res.status(400).json(err));
    },

    updateOneEvent: (req, res) => {
        Event.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {new: true, runValidators: true},
        )
            .then((updatedEvent) => {
                console.log(`Updated Event ${updatedEvent}`);
                res.json(updatedEvent);
            })
            .catch((err) => res.status(400).json(err));
    },

    deleteOneEvent: (req, res) => {
        Event.findByIdAndDelete({ _id: req.params.id })
            .then((deletedEvent) => {
                console.log(deletedEvent);
                res.json(deletedEvent);
            })
            .catch((err) => res.status(400).json(err));
    },

}