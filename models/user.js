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
    }],
    // Adding enables the getters and virtuals
    toJSON: {
        virtuals: tru,
        getters: true
    },
    id: false,
});

// Create a virtual called 'friendCount' that retrieves the length of the user's 'friends' array field on query.
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });


const User = model('User', userSchema);
module.exports = User;