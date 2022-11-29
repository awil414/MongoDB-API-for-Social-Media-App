// Require schema and model from mongoose
const mongoose = require('mongoose');
// Require mongoose email validator
// require('mongoose-type-email');
// mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'


// Construct a new instance of the scema class
const userSchema = new mongoose.Schema({
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
        // mongoose.SchemaTypes.Email 
        // Got this from the mongoose docs
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})

// userSchema.path('user.email').validate(...)
// const user = new User();
// const error = user.validateSync();

const User = mongoose.model('User', userSchema);
module.exports = User;