const jwt = require('jsonwebtoken');
const configFile = require('../myConfig/default.json');

module.exports = function(req,res,next){
    
    const token = req.cookies.token

    if(!token){
        return res.send({status:"ERROR", msg: "Token not defined"});
    }

    //Verify token
    try{
        jwt.verify(token, configFile.jwtSecret, (err,decoded) => {
            if(err){
                console.log("Error verifying token");
                res.send({status: "ERROR", msg:"Could not verify token"});
            }
            else{
                console.log("decoded");
                req.user = decoded.user;
                next();
            }
        });
    }
    catch(err){
        res.send({status:"ERROR", msg: "Token not valid"});
    }
}