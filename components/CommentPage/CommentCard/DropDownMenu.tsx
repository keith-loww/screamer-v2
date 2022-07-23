import React from 'react'
import { Comment } from '../../types'
import { Menu } from '@mantine/core'
import { useUser } from '@auth0/nextjs-auth0'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    comment: Comment
}

const DropDownMenu = ({ comment }: PropTypes) => {
    const { user } = useUser()
    if (!user) return null

    const deleteHandler = () => {
        console.log('delete comment')
    }

    return (
        <Menu placement='end'>
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