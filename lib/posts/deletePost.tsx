import axios from "axios";
import { NextRouter } from "next/router";
import { showNotification } from '@mantine/notifications';
import { FaRegTrashAlt } from 'react-icons/fa'

const deletePost = async (postId: string, router: NextRouter) => {
    try {
        showNotification({
            message: "POST SUCCESSFULLY DELETED",
            color: "green",
            icon: <FaRegTrashAlt />
        });
        await axios.delete(`/api/posts/${postId}`);
        router.push("/")
    } catch (err) {
        console.error(err);
    }
}

export default deletePost;