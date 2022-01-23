const commentController = require('../controllers/comment.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
    app.get('/api/comments', commentController.getAllComments);
    app.post('/api/comments', authenticate, commentController.createComment);    
}