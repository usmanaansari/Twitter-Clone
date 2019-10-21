const ItemController = require('../controllers/ItemController');
const auth = require('../middleware/auth');

module.exports = (app) =>{
    app.post('/additem',auth, ItemController.addItem);
    app.get('/item/:id', ItemController.getItem);
};

//add auth to additem
