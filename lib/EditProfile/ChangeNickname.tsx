import { showNotification, updateNotification } from "@mantine/notifications"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { AiOutlineExclamation } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

const changeNickname = async (nickname: string, id: string, setLoading: (state: boolean) => void) => {
    const notifId = generateChangeNicknameNotifId()
    try {
        setLoading(false)
        createChangeNicknameNotif(notifId)
        const user = await changeNicknameRequest(nickname, id)
        resolveChangeNicknameNotif(notifId)
        setLoading(false)
        return user
    } catch (error) {
        errorChangeNicknameNotif(notifId)
        setLoading(false)
        console.log(error)
    }
}

const createChangeNicknameNotif = (notifId: string) => {
    showNotification({
        id: notifId,
        message: "Changing nickname...",
        loading: true
    })
}

const resolveChangeNicknameNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "NICKNAME CHANGED",
        loading: false,
        color: "green",
        icon: <FaCheckCircle />
    })
}

const errorChangeNicknameNotif = (notifId: string) => {
    updateNotification({
        id: notifId,
        message: "ERROR CHANGING NICKNAME",
        loading: false,
        color: "red",
        icon: <AiOutlineExclamation />
    })
}

const generateChangeNicknameNotifId = () => {
    return `change-nickname-notif-${uuidv4()}`
}

const changeNicknameRequest = async (nickname: string, id: string) => {
    const user = await axios.patch(`api/users/${id}`, { nickname })
    return user.data.data
}

export default changeNickname
