import React from 'react'
import { Comment } from '../../types'
import { ActionIcon, Menu } from '@mantine/core'
import { useUser } from '@auth0/nextjs-auth0'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import deleteComment from '../../../lib/comments/deleteComment'

interface PropTypes {
    comment: Comment,
    setEditMode: (editMode: boolean) => void
}

const DropDownMenu = ({ comment, setEditMode }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    if (!user) return null

    const deleteHandler = async () => {
        await deleteComment(comment, router)
    }

    return (
        <Menu
        position='bottom-end'
        withinPortal
        width={200}
        shadow="md"
        transition="pop" >
            <Menu.Target>
                <ActionIcon variant='subtle' >
                    <BsThreeDots />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
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
            </Menu.Dropdown>
        </Menu>
    )
}

export default DropDownMenu