const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: [true, "Comment is required"],
        minLength: [3, "Comment must be at least 3 characters"],
        maxLength: [255, "Event name must be less than 255 characters"]
    },

    commentDate: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: function (v) {
                return(
                    v && // checking if there is a date object
                    // checking if the date is 1 day in the future
                    v.getTime() > Date.now() - 24 * 60 * 60 * 1000
                );
            },
            message: "Date must be current"
        }
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }   

}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;