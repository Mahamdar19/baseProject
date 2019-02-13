const mongoose = require('mongoose');

// Setup schema
const addressSchema = mongoose.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: { 
        type: String, 
    }
    
});
const address = mongoose.model('Address', addressSchema,'Address');

module.exports =address;



