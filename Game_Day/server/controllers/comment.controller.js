const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');

module.exports = {
    createComment: (req, res) => {
        const comment = new Comment(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken,
            {complete: true});

        comment.userId = decodedJWT.payload.user_id;

        Comment.create(comment)
            .then((newComment) => {
                console.log(`New Comment: ${newComment}`);
                res.json(newComment);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    getAllComments: (req, res) => {
        Comment.find()
            .sort({commentDate : "descending"})
            .then((allComments) => {
                console.log(`Comment List : ${allComments}`);
                res.json(allComments);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

}