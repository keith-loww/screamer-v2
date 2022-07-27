import axios from "axios"

const ChangeNickname = async (nickname: string, id: string) => {
    try {
        const user = await axios.patch(`api/users/${id}`, { nickname })
        return user.data.data
    } catch (error) {
        console.log(error)
    }
}

export default ChangeNickname
