const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: [true, "You must enter an event name"],
        minLength: [3, "Event name must be at least 3 characters"],
        maxLength: [50, "Event name must be less than 50 characters"]
    },

    streetAddress: {
        type: String,
        required: [true, "You must enter an address for the event"],
        minLength: [5, "Street address must be at least 5 characters"],
        maxLength: [100, "Address can not be longer than 100 characters"]
    },

    city: {
        type: String,
        reqired: [true, "You must enter a city"],
        minLength: [3, "City must be 3 characters"],
        maxlength: [50, "City must be less than 51 characters"]
    },

    state: {
        type: String,
        required: [true, "You must choose a state"],
        enum: {
            values:["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY",],
            message: "You must pick one of the 50 US states"},
    },

    zip: {
        type: Number,
        required: [true, "You must enter a zip code"],
        minLength: [5, "Zip code must be 5 digits"],
        maxLength: [5, "Zip code must be 5 digits"]
    },

    attendeeMax: {
        type: Number,
        required: [true, "You must enter a max allowed attendance"],
        minLength: [1, "Max attendance must be at least 1 character long"],
        maxLength: [19, "Max attendance must be less than 20 characters long "]
    },

    date: {
        type: Date,
        required: [true, "You must choose a date for your event"],
        validate: {
            validator: function (v) {
                return(
                    v && // checking if there is a date object
                    // checking if the date is 1 day in the future
                    v.getTime() > Date.now() + 24 * 60 * 60 * 1000
                );
            },
            message: "Event must be at least 1 day in the future"
        }
    },

    suggestedGame: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1
            },
            message: "You must at least choose 1 game"
        },
        validate: {
            validator: function (v) {
                return v.length < 4
            },
            message: "You may choose up to 3 suggested games"
        }
    },

    eventDescription: {
        type: String,
        required: [true, "You must provide an event description"],
        minLength: [5, "Description must be at least 5 characters long"],
        maxLength: [500, "Description must be less than 501 characters"]
    },
    // add the user id for the user creating each event
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }


}, {timestamps: true});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;