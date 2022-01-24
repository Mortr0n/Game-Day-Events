const { ja } = require('date-fns/locale');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: [true, "Comment is required"],
        minLength: [3, "Comment must be at least 3 characters"],
        maxLength: [255, "Event name must be less than 255 characters"]
    },
    
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Must add event ID"],
        ref: "Event",
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;