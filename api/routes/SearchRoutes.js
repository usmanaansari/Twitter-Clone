const SearchController = require('../controllers/SearchController');
const auth = require('../middleware/auth');

module.exports = (app) =>{
    app.post('/search',auth, SearchController.search);
};