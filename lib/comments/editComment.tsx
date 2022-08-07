import { showNotification, updateNotification } from "@mantine/notifications"
import axios from "axios"
import React from "react";
import { BsPencilFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';


const editComment = async (content: string,
    id: string,
    setLoading: (state: boolean) => void) => {
    const notifId = generateEditCommentNotifId()
    try {
        setLoading(true)
        createEditCommentNotif(notifId)
        const comment = await editCommentRequest(content, id)
        resolveEditCommentNotif(notifId)
        setLoading(false)
        return comment
    } catch (error) {
        errorEditCommentNotif(notifId)
        setLoading(false)
        console.log(error)
    }
}
export default editComment
const createEditCommentNotif = (notifId: string) => {
    showNotification({
        id: notifId,
        message: "Editing comment...",
        loading: true
    })
}
const resolveEditCommentNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "COMMENT SUCCESSFULLY EDITED",
        loading: false,
        color: "green",
        icon: <BsPencilFill />
    })
}
const errorEditCommentNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "ERROR EDITING COMMENT",
        loading: false,
        color: "red",
    })
}
const generateEditCommentNotifId = () => {
    return `edit-comment-notif-${uuidv4()}`
}
const editCommentRequest = async (content: string, id: string) => {
    const comment = await axios.patch(`/api/comments/${id}`, { content })
    return comment.data.data
}