const mongoose = require('mongoose');

// Setup schema
const postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type:String,
    },
    userId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }
       
});
const post = mongoose.model('Post', postSchema,'Post');
module.exports =post;

