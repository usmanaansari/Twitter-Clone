const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const myConfig = require('../myConfig/default.json');

const configContent = myConfig


exports.determineFollow = async (req,res) =>{

    //Get username to follow or unfollow
    var currentUser = req.user.username;
    const userToFollow = req.body.username;

    const userExist = await User.findOne({username: userToFollow});
    if(userExist){
        if((!req.body.follow) || req.body.follow == "true" ){
            //Add usertoFollow to currentUser's following list
            User.update({
                username: currentUser}, 
                { $addToSet: { following: userToFollow }
            }).exec(function(err, user){
                if(err){ res.send({status:"error", msg: "Already following " + userToFollow});}
                else{
                    //Add current user to userToFollow's followers list
                    User.update({
                        username: userToFollow},
                        {$addToSet: {followers: currentUser}
                    }).exec(function(err,user){
                        if(err){res.send({status:"error"});}
                        else{
                            res.send({status:"OK", msg:"You are now following " + userToFollow});
                        }
                    })
                }
            });
        }
        else if (req.body.follow == "false"){
            //Remove userToFollow from following list
            User.update({
                username: currentUser},
                { $pull: { following: userToFollow}
            }).exec(function(err, user){
                if(err){ res.send({status:"error", msg: "Not following user already"}); }
                else{
                    //Remove currentUser from userToFollow's followers list
                    User.update({
                        username: userToFollow},
                        { $pull: {followers: currentUser}
                    }).exec(function(err,user){
                        if(err){res.send({status:"error", msg: ""});}
                        else{
                            res.send({status:"OK", msg: userToFollow + " unfollowed!"})
                        }
                    })
                }
            })
        }
        else{
            res.send({status:"error", msg:"Follow variable in request body is neither true or false"});
        }
    }
    else{
        res.send({status:"error"});
    }
};