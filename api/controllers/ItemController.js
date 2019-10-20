const Item = require('../models/Item');



exports.getItem = async (req,res) =>{
    itemId = req.body.itemId;

};

exports.addItem = async (req,res) =>{
    const currentUser = req.user;
    const content = req.body.content;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g, '/');
    const newItem = Item({
        id: Math.floor((Math.random()*100)+1),
        username: currentUser,
        content: content,
        timestamp: utc
    })
    newItem.save(function(err){
        if(err){
            res.send({status:"error", msg: error});
        }
        else{
            console.log("Item saved to DB! " + newItem);
        }
    });
    
};
