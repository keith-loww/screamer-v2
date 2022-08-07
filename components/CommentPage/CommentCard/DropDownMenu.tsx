import React from 'react'
import { Comment } from '../../types'
import { Menu } from '@mantine/core'
import { useUser } from '@auth0/nextjs-auth0'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import { BsPencil } from 'react-icons/bs'

interface PropTypes {
    comment: Comment,
    setEditMode: (editMode: boolean) => void
}

const DropDownMenu = ({ comment, setEditMode }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    if (!user) return null

    const deleteHandler = async () => {
        try {
            await axios.delete(`/api/comments/${comment.id}`)
            showNotification({
                message: 'COMMENT SUCCESSFULLY DELETED',
                color: "green",
                icon: <FaRegTrashAlt />
            })
            if (comment.replyToType === 'Post') {
                router.push(`/posts/${comment.replyTo.id}`)
            } else {
                router.push(`/comments/${comment.replyTo.id}`)
            }
        } catch (error) {
            showNotification({
                message: 'Error deleting comment',
                color: "red"
            })
        }
    }

    return (
        <Menu placement='end'>
            <Menu.Item
            icon={<BsPencil />}
            onClick={() => setEditMode(true)}>
                Edit
            </Menu.Item>
            <Menu.Item
            color="red"
            icon={<FaRegTrashAlt />}
            onClick={deleteHandler}>
                Delete
            </Menu.Item>
        </Menu>
    )
}

export default DropDownMenu