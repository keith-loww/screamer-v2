import { Menu } from '@mantine/core'
import React from 'react'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    deleteHandler: () => void,
    setEditMode: (editMode: boolean) => void
}

export default function DropdownMenu({deleteHandler, setEditMode} : PropTypes) {
    return (
        <Menu withArrow position='bottom-start' zIndex={100}>
            <Menu.Target>
                <BsThreeDots />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                icon={<BsPencil />}
                onClick={() => setEditMode(true)}>Edit</Menu.Item>
                <Menu.Item
                color="red"
                icon={<FaRegTrashAlt />}
                onClick={deleteHandler}>Delete</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}