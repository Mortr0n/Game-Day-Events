const Comment = require('../models/comment.model');
const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');

module.exports = {

    createComment: (req, res) => {
        // comment obj from the post
        const comment = new Comment(req.body);
        // decoding cookie to attach userId to the comment
        const decodedJWT = jwt.decode(req.cookies.usertoken,
            {complete: true});
        // attaching the userId to the comment
        comment.userId = decodedJWT.payload.user_id;
        // add comment to the collection
        Comment.create(comment)
            .then((newComment) => {
                console.log(`New Comment: ${newComment}`);
                // Updating the event document to include this new comment._id
                Event.findByIdAndUpdate(
                    newComment.event, //id from the event.  Should have named it better
                    // this is the data that I want to update
                    {   // taking the new comment id and adding to the comments array in the event
                        $push: { comments: newComment._id } 
                    },
                    {
                        new: true, // use new version not original
                        useFindAndModify: false // mongoose replaces the entire object by default.  Overriding this here.
                    },
                )
                    // specify which information to include
                    .populate({
                        path: "comments",
                        model: "Comment",
                        populate: {
                            path: "userId",
                            model: "User",
                            select: "firstName lastName email" 
                        }
                    })
                    .then((updatedEvent) => {
                        console.log(`Updated Event ${updatedEvent}`);
                        // res.json(newComment);
                        res.json(updatedEvent);
                    })
                // res.json(newComment);  Might need.  Check 1st!!!
                .catch((err) => {
                    console.log("Error in add Comment to movie")
                    console.log(err);
                    res.status(400).json(err);
                });
            })
            .catch((err) => {
                console.log("Error in creating comment")
                console.log(err);
                res.status(400).json(err);
            });
    },

    getAllComments: (req, res) => {
        Comment.find()
            // Sorting and adding the items we need         
            .sort({createdAt : "descending"})
            .populate("userId", "firstName lastName email -_id")            
            .then((allComments) => {
                console.log(`Comment List : ${allComments}`);
                res.json(allComments);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

}