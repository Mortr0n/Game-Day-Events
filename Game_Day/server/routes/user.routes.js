const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/users/register", userController.register);
    app.post("/api/users/login", userController.login);
    app.post("/api/users/logout", userController.logout);
    app.get("/api/users/getLoggedIn", authenticate, userController.getLoggedInUser);
    app.put("/api/users/attendEvent", authenticate, userController.joinOneEvent);
    app.put("/api/users/unAttendEvent", authenticate, userController.unJoinOneEvent);
    // FIXME: needs authenticate if we're gonna have these
    app.delete("/api/users/:id", userController.deleteOneUser);
    //FIXME: this route is for checking functionality and must be removed!
    app.get("/api/users", userController.getAll);
}