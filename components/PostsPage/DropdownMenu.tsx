import { Menu } from '@mantine/core'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

interface PropTypes {
    deleteHandler: () => void
}

export default function DropdownMenu({deleteHandler} : PropTypes) {
    return (
        <Menu placement='end'>
            <Menu.Item
            color="red"
            onClick={deleteHandler}>Delete</Menu.Item>
        </Menu>
    )
}