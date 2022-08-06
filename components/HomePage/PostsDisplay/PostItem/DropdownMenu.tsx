import { ActionIcon, Menu } from '@mantine/core'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

interface PropTypes {
    deleteHandler: () => void
}

export default function DropdownMenu({deleteHandler} : PropTypes) {
    return (
        <Menu
        width={200}
        withinPortal
        shadow="md"
        position='bottom-end'
        transition="scale" >
            <Menu.Target>
                <ActionIcon variant='subtle'>
                    <BsThreeDots />
                </ActionIcon>
            </Menu.Target>
            
            <Menu.Dropdown>
                <Menu.Item
                color="red"
                icon={<FaRegTrashAlt />}
                onClick={deleteHandler}>Delete</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}