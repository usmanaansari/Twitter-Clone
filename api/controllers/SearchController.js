const Item = require('../models/Item');
const User = require('../models/User');

exports.search = async (req,res) => {
    const timeGiven = req.body.timestamp;
    var limitGiven = req.body.limit;
    var usernameGiven = req.body.username;
    var followingGiven = req.body.following;
    var queryGiven = req.body.q;
    //console.log(usernameGiven);
    //console.log(queryGiven);
    var query = {
        '$and': []
    };
    /*
        {timestamp:{ $lte: timeNow*1000}} needs to be applied to every query
        However, a username can be supplied, therefore
        { username: username } needs to be added
        However, a query can be supplied therefore
        { $text : { $search : q} } needs to be added

    */

    //console.log(timeGiven);
    //console.log("Item limit recieved: " + limitGiven);
    var limit = 0;
    var timeNow = 0;
    //console.log("The type of limit is " + typeof limitGiven);
    if(!timeGiven) { 
        timeNow = new Date();
        //console.log("timeGiven Null " + timeNow); 
    }
    else{ 
        //timeNow = timeGiven*1000; 
        timeNow = timeGiven;
        //console.log("time was given " + timeNow);
    }

    if(limitGiven === "" || typeof limitGiven === 'undefined' || typeof limitGiven === 'null') { 
        //console.log("limit is empty string"); 
        limit = 25; 
        //console.log("limit should be " + limit); 
    }
    else{ 
        limit = Number(limitGiven);
        //console.log("limit should be " + limit); 
        if(limit > 100){
            limit = 100;
        }
        else if(limit < 25){
            limit = 25;
        }
    }
    //Push timestamp query
    query['$and'].push({timestamp:{ $lte: timeNow*1000}});

    if(queryGiven === "" || typeof queryGiven === 'undefined' || typeof queryGiven === 'null'){
        console.log("No query given");
    }
    else{
        // Item.find( { $text : { $search : q} } )
        query['$and'].push( { $text: {$search : queryGiven} });

    }
    if(usernameGiven === "" || typeof usernameGiven === 'undefined' || typeof usernameGiven === 'null'){
        //Dont filter by username
    }
    else{
        // Return items only by that username
        query['$and'].push( { username: usernameGiven} );
    }

    if(followingGiven === true || followingGiven === "true"){
        console.log(req.user);
        if(req.user){
            console.log(req.user);
            const followingList = await User.find({username:req.user['username']}).select( '-_id following');
            console.log(followingList);
            const orQuery = {
                '$or': []
            }
            for(var i =0; i <followingList[0]['following'].length;i++ ){
                orQuery['$or'].push( { username: followingList[0]['following'][i]});
            }
            query['$and'].push(orQuery);
            console.log(orQuery['$or'])
            console.log(followingList);
            //query['$and'].push();
        }
        else{

        }
        
    }

    console.log("The query to be used is " + toString(query['$and']));

    console.log("Limit to be used is " + limit);
    try{
        const foundItems = await Item.find(query).select('-_id -__v').limit(limit);
        if(foundItems == null){
            res.send({status:"error", msg: "No items found"});
        }
        else{
            console.log("number of items returned " + foundItems.length);
            searchResults = foundItems.map((val,index,arr)=>{
                var unixTimeStamp = Number(arr[index].timestamp)/1000;
                //console.log("The unix version is ");
                //console.log(unixTimeStamp);
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