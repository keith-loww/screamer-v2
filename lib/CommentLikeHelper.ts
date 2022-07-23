import axios from "axios";
import { CommentData } from "../components/types";

const AddOrRemoveLike = async (commentId: string, userId: string) => {
    const resp = await axios.get(`/api/comments/${commentId}`);
    const originalComment : CommentData = resp.data.data
    const alreadyLiked = originalComment.likedBy.includes(userId);
    const newLikedBy = alreadyLiked ? originalComment.likedBy.filter(id => id !== userId) : [...originalComment.likedBy, userId];
    const newComment = { ...originalComment, likedBy: newLikedBy };
    await axios.put(`/api/comments/${commentId}`, newComment);
    return newComment;
}

export default AddOrRemoveLike;