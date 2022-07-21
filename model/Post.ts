import mongoose from "mongoose";
import Comment from "./comment";
import User from "./user";
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 280
    },
    author: {
        type: String,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    likedBy: [
        {
            type: String,
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Comment.modelName
        }
    ]
})

postSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()   
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)