// Require schema and model from mongoose
// Types object lets us use The object ID function to generate mongoose ID - line 10
const { Schema, model, Types } = require('mongoose');
const moment = require ('moment');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // default turned into function and will only return new id if a reaction is being created
            default: () => {
                return new Types.ObjectId()
            }
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query - callback function
            get: (date) => {
                const formatDate = moment(date).format('MM/DD/YYYY')
                return formatDate
            }
        },
        username: {
            type: String,
            required: true
        },
        
    }, {
        // adding enables the getters and virtuals
        toJSON: {
            getters: true,
        }

    }
)

const thoughtSchema = new Schema (
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
            // Use a getter method to format the timestamp on query - callback function
            get: (date) => {
                const formatDate = moment(date).format('MM/DD/YYYY')
                return formatDate
            }
        },
        username: {
            type: String,
            required: true
        },
        // subdocument of thought document
        reactions: [reactionSchema]
    }, {
        // adding enables the getters and virtuals
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,   

    }
);

// Create a virtual property 'recationCount' that gets and sets the length of thought's 'reactions' array field on query
userSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.length}`;
    });
    

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;