const { response } = require('express');
const Event = require('../models/event.model');


module.exports = {
    // FIXME: remove this later
    index: (req, res) => {
        res.json({ message: "Howdy"});
    },

    createEvent: (req, res) => {
        // const event = new Event(req.body);

        Event.create(req.body)
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