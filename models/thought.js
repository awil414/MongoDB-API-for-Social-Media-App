// Require schema and model from mongoose
const mongoose = require('mongoose');


const thoughtSchema = new mongoose.Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        
    }
)

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;