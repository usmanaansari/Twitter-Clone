const mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    property:{
        likes:{
            type: Number,
            default: 0
        }
    },
    retweeted:{
        type: Number,
        default: 0,
        required: true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        //default: Math.floor(Date.now / 1000)
        default: Date.now
    }
}, {collection: 'items'});

module.exports = mongoose.model('Item', ItemSchema);