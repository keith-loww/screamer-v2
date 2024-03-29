import { showNotification, updateNotification } from "@mantine/notifications"
import axios from "axios";
import { BsPencilFill } from "react-icons/bs"
import { v4 as uuidv4 } from 'uuid';

const editPost = async (content: string, 
    id: string, 
    setLoading: (state: boolean) => void) => {
    const notifId = generateEditPostNotifId()
    try {
        setLoading(true)
        createEditPostNotif(notifId)
        const post = await editPostRequest(content, id)
        resolveEditPostNotif(notifId)
        setLoading(false)
        return post
    } catch (error) {
        errorEditPostNotif(notifId)
        setLoading(false)
        console.log(error)
    }
}

export default editPost

const createEditPostNotif = (notifId: string) => {
    showNotification({
        id: notifId,
        message: "Editing post...",
        loading: true
    })
}

const resolveEditPostNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "POST SUCCESSFULLY EDITED",
        loading: false,
        color: "green",
        icon: <BsPencilFill />
    })
}

const errorEditPostNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "ERROR EDITING POST",
        loading: false,
        color: "red",
    })
}

const generateEditPostNotifId = () => {
    return `edit-post-notif-${uuidv4()}`
}

const editPostRequest = async (content: string, id: string) => {
    const post = await axios.patch(`/api/posts/${id}`, { content })
    return post.data.data
}
