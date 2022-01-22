const eventController = require('../controllers/event.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api', eventController.index);
    app.post('/api/events', authenticate, eventController.createEvent);
    app.get('/api/events', eventController.getAllEvents);
    app.get('/api/events/:id', eventController.getOneEvent);
    app.put('/api/events/:id',  authenticate, eventController.updateOneEvent);
    app.delete('/api/events/:id', authenticate, eventController.deleteOneEvent);
}