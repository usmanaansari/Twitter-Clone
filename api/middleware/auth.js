const jwt = require('jsonwebtoken');
const configFile = require('../myConfig/default.json');

module.exports = function(req,res,next){
    console.log(req.cookies);
    const token = req.cookies.token

    if(!token){
        return res.send({status:"error", msg: "Token not defined"});
    }

    //Verify token
    try{
        jwt.verify(token, configFile.jwtSecret, (err,decoded) => {
            if(err){
                console.log("Error verifying token");
                res.send({status: "error", msg:"Could not verify token"});
            }
            else{
                console.log("decoded user");
                console.log(decoded.user);
                console.log("printed decoded user");
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