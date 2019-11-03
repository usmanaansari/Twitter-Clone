const User = require('../models/User.js');
const mailUser = require('../mail/mailer.js');
const jwt = require('jsonwebtoken');
const myConfig = require('../myConfig/default.json');
const cookie = require('cookie-parser');

const configContent = myConfig

exports.create = async (req,res)=> {
    //validate request params
    //if something wrong, return res.status(400)
    console.log("In user create function");
    //console.log(req.body);
    if(req.body.username === "" | req.body.password === "" | req.body.email === ""){
        res.send({status:"error", msg:"Missing field(s)"});
    }
    try{
        userExist = await User.findOne({
            $or: [
                {username: req.body.username},
                {email: req.body.email}
            ]
        });
        if(userExist){
            return res.send({status:"error", msg:'Username and Email must be unique'});
        }
    }
    catch(error){
        console.log(error);
        console.log("Error querying DB for existing User");
        return res.send({status:"error", msg: error});
    }
    //User doesn't exist, so create one
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        verify: false
    });
    try{
        const savedUser = await user.save();
        const revpass = savedUser.password.split("").reverse().join("");
        mailUser(savedUser.email, revpass);
        res.send({status:"OK", username: savedUser.username});
    }
    catch(error){
        console.log(error);
    }
};

exports.verify = async (req,res) => {

    const email = req.body.email;
    const key = req.body.key;

    try{
        const user = await User.findOne({email: email});
        if(user == null){
            res.send({status:"error", msg:"User with that email doesn't exist"});
        }
        else{
            if(key == "abracadabra" || key == user.password.split("").reverse().join("")){
                if(user.verify ==false){
                    user.verify = true;
                    user.save(function(err){
                        if(err) res.send({status:"error", msg: "Error verifying user in db"});
                        res.send({status:"OK", msg:"User is now verified!"});
                    });
                }
                else{
                    res.send({status:"error", msg:"User is already verified"});
                }
            }
            else{
                res.send({status:"error", msg:"Wrong verification code"});
            }
        }
    }
    catch(error){
        res.send({status:"error", msg:"Error querying DB"});
    }
};

exports.login = async (req,res) =>{
    const{username, password} = req.body;
    console.log("Login attempt with " + username);

    try{
        const existingUser = await User.findOne({username:username});
        if(existingUser == null) res.send({status:"error", msg:"Can't find user with that username"});
        else{
            console.log("Ok user exists");
            if(existingUser.verify == false) res.send({status:"error", msg:"Verify your account first!"});
            console.log("Ok exiting user is already verified");
            const payload = {
                user:{
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    password: existingUser.password
            }}
            //console.log("payload created " + payload);
            //console.log(password);
            //console.log(existingUser.password);
            if(password == existingUser.password){
                console.log("Password is correct");
                //console.log(configContent.jwtSecret);
                jwt.sign(payload, configContent.jwtSecret,{
                    expiresIn: 3600
                },
                (err,token)=>{
                    if(err) console.log(err);
                    else{
                        var utc = new Date().toJSON().slice(0,10).replace(/-/g, '/');
                        res.cookie('token', token).send({status:"OK", msg:existingUser.username + " is now logged in!"});
                    }
                });
            }
            else{
                res.send({status:"error", msg:"Password doesn't match"});
            }
        }
    }
    catch(error){
        console.log(error);
    }
};

exports.logout = async (req,res) => {
    //blacklist jwt token
    res.clearCookie('token');
    res.send({status:"OK", msg:"User has logged out!"});
};