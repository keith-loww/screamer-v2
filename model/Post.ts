import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 280
    },
    author: {
        type: String,
        required: true
    },
    likedBy: [
        {
            type: String
        }
    ]
})
export default mongoose.models.Post || mongoose.model("Post", postSchema)