import axios from "axios";
import { NextRouter } from "next/router";
import { showNotification } from '@mantine/notifications';
import { FaRegTrashAlt } from 'react-icons/fa'
import { Comment } from "../../components/types";

const deleteComment = async (comment: Comment, router: NextRouter) => {
    try {
        await axios.delete(`/api/comments/${comment.id}`);
        showNotification({
            message: "COMMENT SUCCESSFULLY DELETED",
            color: "green",
            icon: <FaRegTrashAlt />
        });
        if (comment.replyToType === "Post") {
            router.push(`/posts/${comment.replyTo.id}`);
        } else {
            router.push(`/comments/${comment.replyTo.id}`);
        }
    } catch (err) {
        showNotification({
            message: "Error deleting comment",
            color: "red"
        });
        console.error(err);
    }
}

export default deleteComment;