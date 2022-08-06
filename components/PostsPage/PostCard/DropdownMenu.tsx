import { ActionIcon, Menu } from '@mantine/core'
import React from 'react'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    deleteHandler: () => void,
    setEditMode: (editMode: boolean) => void
}

export default function DropdownMenu({deleteHandler, setEditMode} : PropTypes) {
    return (
        <Menu withArrow position='bottom-end' zIndex={100} withinPortal>
            <Menu.Target>
                <ActionIcon variant="transparent">
                    <BsThreeDots />
                </ActionIcon>
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