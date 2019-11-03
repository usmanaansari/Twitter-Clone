const FollowController = require("../controllers/FollowController");
const auth = require("../middleware/auth")


module.exports = (app) => {
    app.post('/follow', auth, FollowController.determineFollow);
};
