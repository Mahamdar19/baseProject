const mongoose = require('mongoose');

// Setup schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: { 
        type: String, 
    },
    gender: {
        type: String,
      }, 
    //   address: [addressSchema],
    // posts: 
    //     [{type:  mongoose.Schema.ObjectId,
    //       ref: 'Post'}]
});

const user = mongoose.model('User', userSchema,'User');

module.exports =user;



