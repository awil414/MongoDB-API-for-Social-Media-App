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
        validate: {
            validator: function(v) {
                return /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/.test(v);
            },
            message: proprs => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
    },
    thoughts:
    friends:

})

// userSchema.path('user.email').validate(...)
const User = mongoose.model('User', userSchema);

// const user = new User();
// const error = user.validateSync();

module.exports = User;