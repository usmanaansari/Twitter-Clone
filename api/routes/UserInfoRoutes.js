const UserInfoController = require('../controllers/UserInfoController');
//const auth = require('../middleware/auth');


module.exports = (app) => {
    app.get('/user/:username', UserInfoController.getUser);
    app.get('/user/:username/posts', UserInfoController.getPosts);
    app.get('/user/:username/followers', UserInfoController.getFollowers);
    app.get('/user/:username/following', UserInfoController.getFollowing);
};