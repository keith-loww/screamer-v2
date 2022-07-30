import { Menu, MenuItem } from '@mantine/core'
import React from 'react'
import { BsPencil } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    deleteHandler: () => void,
    setEditMode: (editMode: boolean) => void
}

export default function DropdownMenu({deleteHandler, setEditMode} : PropTypes) {
    return (
        <Menu placement='end'>
            <Menu.Item
            color="red"
            icon={<FaRegTrashAlt />}
            onClick={deleteHandler}>Delete</Menu.Item>
            <Menu.Item
            icon={<BsPencil />}
            onClick={() => setEditMode(true)}>Edit</Menu.Item>
        </Menu>
    )
}