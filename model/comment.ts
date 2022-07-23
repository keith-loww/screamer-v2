import mongoose from 'mongoose';
import User from './user';

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        ref: User.modelName,
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 280
    },
    date: {
        type: Date,
        required: true
    },
    likedBy: [
        {
            type: String,
            ref: 'User'
        }
    ],
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'replyToType',
        required: true
    },
    replyToType: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
});

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)