import { Menu } from '@mantine/core'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    deleteHandler: () => void
}

export default function DropdownMenu({deleteHandler} : PropTypes) {
    return (
        <Menu placement='end'>
            <Menu.Item
            color="red"
            icon={<FaRegTrashAlt />}
            onClick={deleteHandler}>Delete</Menu.Item>
        </Menu>
    )
}