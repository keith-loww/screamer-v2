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
    date: {
        type: Date,
        required: true
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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