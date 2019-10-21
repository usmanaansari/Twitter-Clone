const ItemController = require('../controllers/ItemController');

module.exports = (app) =>{
    app.post('/additem', ItemController.addItem);
    app.get('/item/:id', ItemController.getItem);
};

//add auth to additem
