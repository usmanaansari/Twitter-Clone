const Item = require('../models/Item');

exports.search = async (req,res) => {
    const timeGiven = req.body.timestamp;
    const limitGiven = req.body.limit;
    console.log(timeGiven);
    console.log(limitGiven);
    var limit = 0;
    var timeNow = 0

    if(!timeGiven) { 
        timeNow = new Date();
        console.log("timeGiven Null " + timeNow); 
    }
    else{ 
        timeNow = timeGiven*1000; 
        console.log("time was given " + timeNow);
    }

    if(limitGiven == null) { const limit = 25; }
    else{ limit = limitGiven; }
    
    console.log(timeNow);

    //default limit 25, max limit 100
    //default time: current. Represented in unix time in seconds
    const timeme = new Date();
    try{
        const foundItems = await Item.find({timestamp:{ $lte: timeNow}}).limit(Number(limit));
        if(foundItems == null){
            res.send({status:"ERROR", msg: "No items found"});
        }
        else{
            console.log(foundItems);
            res.send({status:"OK", items: foundItems});
        }
    }
    catch(error){
        console.log(error);
    }
};