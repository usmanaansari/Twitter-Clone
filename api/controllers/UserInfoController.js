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
        user: {
            email: foundUser.email,
            followers = foundUser.followers,
            following = foundUser.following
        }
        res.send({status:"OK", user: user });
    }
    //Check params for username to get

    //Find user with that username in DB

    /*
        Return user object as
        user : {
            email: string
            followers: follower count
            following: following count
        }
    */

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
    
    res.send({status:"OK", items:usersItems});
    //Check params for username to get

    //Pass in username to getUser function

    //Return all posts with that username

    //Return { items : list of post item ID's }

};

exports.getFollowers = async (req,res) => {

    //Check params for username to get

    //Find user with that username in DB

    //Return list of followers of that User

    //As users: { list of usernames (strings) }

};

exports.getFollowing = async (req,res) => {

    //Check params for username to get

    //Find user with that username in DB



};

