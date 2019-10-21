const SearchController = require('../controllers/SearchController');


module.exports = (app) =>{
    app.post('/search', SearchController.search);
};