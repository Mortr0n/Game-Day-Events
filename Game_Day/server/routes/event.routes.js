const eventController = require('../controllers/event.controller');

module.exports = (app) => {
    app.get('/api', eventController.index);
    app.post('/api/events', eventController.createEvent);
    app.get('/api/events', eventController.getAllEvents);
    app.get('/api/events/:id', eventController.getOneEvent);
    app.put('/api/events/:id', eventController.updateOneEvent);
    app.delete('/api/events/:id', eventController.deleteOneEvent);
}