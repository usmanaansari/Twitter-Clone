const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const myConfig = require('../myConfig/default.json');

const configContent = myConfig


exports.determineFollow = async (req,res) =>{

    //Get username to follow or unfollow
    var currentUser = req.user.username;
    const userToFollow = req.body.username;
    console.log("In follow Controller");
    const userExist = await User.findOne({username: userToFollow});
    if(userExist){
        console.log("Follow given is " + req.body.follow);
        console.log("current user is " + currentUser);
        console.log("User to follow is " + userToFollow);
        if(req.body.follow == ""){
            console.log("empty follow");
        }
        if(req.body.follow === "" || req.body.follow === "true" || req.body.follow === true){
            console.log("Try to follow user");
            //Add usertoFollow to currentUser's following list
            console.log("About to add " + userToFollow + " to " + currentUser  + "'s list of users they're following");
            User.update({
                username: currentUser}, 
                { $addToSet: { following: userToFollow }
            }).exec(function(err, user){
                if(err){ res.send({status:"error", msg: "Already following " + userToFollow});}
                else{
                    //Add current user to userToFollow's followers list
                    console.log("About to add " + currentUser + " to " + userToFollow + "'s list of followers");
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
        else if (req.body.follow === "false" || req.body.follow === false){
            console.log("req.body.follow is false str or false");
            console.log("Try to unfollow user");
            //Remove userToFollow from following list
            console.log("About to remove " + userToFollow + " from " + currentUser + "'s list of users they're following");
            User.update({
                username: currentUser},
                { $pull: { following: userToFollow}
            }).exec(function(err, user){
                if(err){
                    console.log("Error when removing " + userToFollow + " from " + currentUser + "'s list of users they're following"); 
                    res.send({status:"error", msg: "Not following user already"}); 
                }
                else{
                    console.log("About to remove " + currentUser + " from " + userToFollow + "'s list of followers");
                    //Remove currentUser from userToFollow's followers list
                    User.update({
                        username: userToFollow},
                        { $pull: {followers: currentUser}
                    }).exec(function(err,user){
                        if(err){
                            console.log("Error when removing " + currentUser + " from " + userToFollow + "'s list of followers"); 
                            res.send({status:"error", msg: ""});
                        }
                        else{
                            console.log("Sucessfully removed " + currentUser + " from " + userToFollow + "'s list of followers" );
                            res.send({status:"OK", msg: userToFollow + " unfollowed!"})
                        }
                    })
                }
            })
        }
        else{
            console.log("Follow variable in request body is neither true or false");
            res.send({status:"error", msg:"Follow variable in request body is neither true or false"});
        }
    }
    else{
        console.log("the user doesn't exist");
        console.log(userExist);
        res.send({status:"error"});
    }
};