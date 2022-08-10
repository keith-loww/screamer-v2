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
        router.replace(router.asPath);
    } catch (err) {
        console.error(err);
    }
}

export default deletePost;