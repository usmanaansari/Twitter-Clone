const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const cookie = require('cookie-parser');
module.exports = (app) => {
    
    //app.use(cookie);
    app.post('/adduser', UserController.create);
    app.post('/verify', UserController.verify);
    app.post('/login', UserController.login);
    app.post('/logout', auth, UserController.logout);
};

//address auth in logout