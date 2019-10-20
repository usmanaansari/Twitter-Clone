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
            type: Number
            
        }
    },
    retweeted:{
        type: Number
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        required: true
    }
}, {collection: 'items'});

module.exports = mongoose.model('Item', ItemSchema);