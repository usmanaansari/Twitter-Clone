var path = require('path');

module.exports = (app) =>{
    app.get("/index", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/index.html'));
    });
    app.get("/register_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/register_page.html'));
    });
    app.get("/verify_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/verify_page.html'));
    });
    app.get("/login_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/login_page.html'));
    });
    app.get("/search_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/search_page.html'));
    });
    app.get("/additem_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/additem_page.html'));
    });
    app.get("/getitem_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/getitem_page.html'));
    });
    app.get("/deleteitem_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/deleteitem_page.html'));
    });
    app.get("/user_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/user_page.html'));
    });
    app.get("/userposts_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/userposts_page.html'));
    });
    app.get("/followers_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/followers_page.html'));
    });
    app.get("/following_page", (req,res)=>{
        res.sendFile(path.resolve('./public/HTML/following_page.html'));
    });
};