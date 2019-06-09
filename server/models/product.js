// Load required packages
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our user schema
const ProductSchema = new Schema({
    productId: 
        {
            type: Number
        },
    name: 
        {
            type: String
        },
    description: 
        {
            type: String
        },
    price : 
        {
            type: Number
        },
    created_at: 
        {
            type: Date,
            default: Date.now
        },
    updated_at: Date
});

module.exports = mongoose.model('Product', ProductSchema);
