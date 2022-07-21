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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)