const Item = require('../models/Item');

exports.search = async (req,res) => {
    const timeGiven = req.body.timestamp;
    var limitGiven = req.body.limit;
    //console.log(timeGiven);
    console.log("Item limit recieved: " + limitGiven);
    var limit = 0;
    var timeNow = 0;
    console.log("The type of limit is " + typeof limitGiven);
    if(!timeGiven) { 
        timeNow = new Date();
        console.log("timeGiven Null " + timeNow); 
    }
    else{ 
        //timeNow = timeGiven*1000; 
        timeNow = timeGiven;
        console.log("time was given " + timeNow);
    }

    if(limitGiven === "" || typeof limitGiven === 'undefined' || typeof limitGiven === 'null') { 
        console.log("limit is empty string"); 
        limit = 25; 
        console.log("limit should be " + limit); 
    }
    else{ 
        limit = Number(limitGiven);
        console.log("limit should be " + limit); 
        if(limit > 100){
            limit = 100;
        }
        else if(limit < 25){
            limit = 25;
        }
    }
    console.log("Limit to be used is " + limit);
    try{
        const foundItems = await Item.find({timestamp:{ $lte: timeNow*1000}}).select('-_id -__v').limit(limit);
        if(foundItems == null){
            res.send({status:"error", msg: "No items found"});
        }
        else{
            console.log("number of items returned " + foundItems.length);
            searchResults = foundItems.map((val,index,arr)=>{
                var unixTimeStamp = Number(arr[index].timestamp)/1000;
                console.log("The unix version is ");
                console.log(unixTimeStamp);
                return {id: val.id, username: val.username, property: val.property, retweeted: val.retweeted, content: val.content, timestamp: unixTimeStamp};
            });
            console.log("Length of search results " + searchResults.length);
            res.send({status:"OK", items: searchResults});
        }
    }
    catch(error){
        console.log(error);
    }
};