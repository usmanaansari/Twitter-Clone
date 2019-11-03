const Item = require('../models/Item');
const uuidv4 = require('uuid/v4');

exports.getItem = async (req,res) =>{
    itemID = req.params.id;
    console.log(itemID);

    const foundItem = await Item.findOne({id:itemID});
    if(foundItem == null) {
        res.send({status:"error", msg:"Item does not exist"});
    }
    else{
        res.send({status:"OK", item: foundItem});
    }
};

exports.addItem = async (req,res) =>{
    //const currentUser = req.body.currentuser;
    const currentUser = req.user;
    const content = req.body.content;
    //var utc = new Date().toJSON().slice(0,10).replace(/-/g, '/');
    //console.log("Printing current user");
    //console.log(currentUser);
    //console.log("printing current user's username");
    //console.log(currentUser.username);
    //id: Math.floor((Math.random()*5000)+1),
    const newItem = Item({
        id: uuidv4(),
        username: currentUser.username,
        content: content
    });
    //console.log("printing new item");
    //console.log(currentUser);
    //console.log(newItem);
    newItem.save(function(err){
        if(err){
            res.send({status:"error", msg: "Error saving item to DB"});
        }
        else{
            //console.log("Item saved to DB! " + newItem);
            res.send({status:"OK", id: newItem.id});
        }
    });

};
