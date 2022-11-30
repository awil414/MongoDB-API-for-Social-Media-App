// Require schema and model from mongoose
const { Schema, model } = require('mongoose');


// Construct a new instance of the schema class
const userSchema = new Schema({
    // Configure individual properties using Schema Types
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 

        type: String, 
        unique: true, 
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        required: [true, 'User email required'],
    },
    // collecting ids from thought
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    // Self-reference table
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})


const User = model('User', userSchema);
module.exports = User;