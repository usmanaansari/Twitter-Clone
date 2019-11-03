const User = require('../models/User.js');
const Item = require('../models/Item.js');
const jwt = require('jsonwebtoken');
const myConfig = require('../myConfig/default.json');

const configContent = myConfig

exports.getUser = async (req,res) => {
    const username = req.params.username;
    console.log(username);

    const foundUser = await User.findOne({username: username});
    if(foundUser == null){
        res.send({status:"error", msg: username + "not found"});
    }
    else{
        console.log(foundUser);
        console.log(foundUser.email);

        const numFollowers = foundUser['followers'].length;
        const numFollowing = foundUser['following'].length;
        
        var user = {
            email: foundUser.email,
            followers: numFollowers,
            following: numFollowing
        }

        res.send({status:"OK", user: user});
        
        
    }
};

//Can call getUser function for followers, folloing, and posts

exports.getPosts = async (req,res) => {

    const username = req.params.username;
    const limitGiven = req.query.limit;
    var limit = 0;

    if(limitGiven === "" || typeof limitGiven === 'undefined' || typeof limitGiven === 'null'){
        limit = 50;
    }
    else{
        limit = Number(limitGiven);
        if(limit > 200){
            limit = 200;
        }
        else if (limit < 50){
            limit = 50;
        }
    }

    const usersItems = await Item.find({username: username}).select(' -_id id').limit(limit);
    usersItemsMap = usersItems.map((val,index,arr)=>{
        return val.id;
    })
    res.send({status:"OK", items:usersItemsMap});
    //Check params for username to get

    //Pass in username to getUser function

    //Return all posts with that username

    //Return { items : list of post item ID's }

};

exports.getFollowers = async (req,res) => {
    const username = req.params.username;
    const limitGiven = req.query.limit;

    if(limitGiven === "" || typeof limitGiven === 'undefined' || typeof limitGiven === 'null'){
        limit = 50;
    }
    else{
        limit = Number(limitGiven);
        if(limit > 200){
            limit = 200;
        }
        else if (limit < 50){
            limit = 50;
        }
    }

    const followerList = await User.find({username:username}).select( '-_id followers').limit(limit);

    res.send({status:"OK", users: followerList});

};

exports.getFollowing = async (req,res) => {

    const username = req.params.username;
    const limitGiven = req.query.limit;

    if(limitGiven === "" || typeof limitGiven === 'undefined' || typeof limitGiven === 'null'){
        limit = 50;
    }
    else{
        limit = Number(limitGiven);
        if(limit > 200){
            limit = 200;
        }
        else if (limit < 50){
            limit = 50;
        }
    }

    const followingList = await User.find({username:username}).select( '-_id following').limit(limit);

    res.send({status:"OK", users: followingList});

};

