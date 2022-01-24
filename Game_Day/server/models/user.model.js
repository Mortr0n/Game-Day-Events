const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [2, "First name must be at least 2 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "Last name msut be at least 2 characters"]
    },

    email: {
        type: String,
        required: [true, "Email address is required"],
        validate: {//Trying email validation using a regex that I've found.
            validator: val => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "please fill in a valid email address"
        } 
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be 8 characters or longer"]
    },

    birthdate: {
        type: Date,
        required: [true, "Birtdate is required"],
        validate: {
            validator: function (v) {
                return(
                    v && // checking for a date object
                    // Date should be 13 or more years in the past.  
                    // Hope this works.
                    v.getTime() < Date.now() - 13 * 365 * 24 * 60 * 60 * 1000
                );
            },
            message: "You must be at least 13 years old to register for this site."
        }
    },
    
    eventsAttending: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]

}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const User = mongoose.model("User", UserSchema);
module.exports = User;