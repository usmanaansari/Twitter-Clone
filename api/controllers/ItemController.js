const Item = require('../models/Item');

exports.getItem = async (req,res) =>{
    itemID = req.params.id;
    console.log(itemID);

    const foundItem = await Item.findOne({id:itemID});
    if(foundItem == null) {
        res.send({status:"ERROR", msg:"Item does not exist"});
    }
    else{
        res.send({status:"OK", item: foundItem});
    }
};

exports.addItem = async (req,res) =>{
    const currentUser = req.body.currentuser;
    const content = req.body.content;
    //var utc = new Date().toJSON().slice(0,10).replace(/-/g, '/');
    const newItem = Item({
        id: Math.floor((Math.random()*100)+1),
        username: currentUser,
        content: content
    })
    newItem.save(function(err){
        if(err){
            res.send({status:"error", msg: error});
        }
        else{
            console.log("Item saved to DB! " + newItem);
            res.send({status:"OK", id: newItem.id});
        }
    });

};
