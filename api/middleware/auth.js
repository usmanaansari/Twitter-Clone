const jwt = require('jsonwebtoken');
const configFile = require('../myConfig/default.json');

module.exports = async function(req,res,next){
    //console.log(req.cookies);
    const token = req.cookies.token
    console.log("in auth");
    console.log(token);
    if(!token){
        console.log(req.url);
        if(req.url == '/search' ){
            console.log("url is search");
            next();
            return;
        }
        else{
            console.log("Should be error");
            //res.status(400).send({msg: "Token not defined"});
            res.status(400);
            //await res.send({status:500, msg: "Token not defined, there may be no logged in user!"});
            //return;
        }
    }

    //Verify token
    try{
        jwt.verify(token, configFile.jwtSecret, (err,decoded) => {
            if(err){
                console.log("Error verifying token");
                res.send({status: "error", msg:"Could not verify token"});
            }
            else{
                //console.log("decoded user");
                //console.log(decoded.user);
                //console.log("printed decoded user");
                req.user = decoded.user;
                next();
            }
        });
    }
    catch(err){
        console.log(err);
        res.send({status:"error", msg: "Token not valid"});
    }
}