const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    verify:{
        type:Boolean
    }
}, {collection: 'siteusers'});

module.exports = mongoose.model('User', UserSchema);