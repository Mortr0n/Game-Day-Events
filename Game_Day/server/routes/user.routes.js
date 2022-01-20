const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/users/register", userController.register);
    app.post("/api/users/login", userController.login);
    app.post("/api/users/logout", userController.logout);
    // this route now has to be authenticated
    app.get("/api/users",  userController.getAll);
}