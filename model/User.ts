import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    nickname: {
        type: String
    },
    created_at: {
        type: Date,
        required: true
    },
    picture: {
        type: String
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]

})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema);