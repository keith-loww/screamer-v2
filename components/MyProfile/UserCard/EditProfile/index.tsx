import { Button, Modal } from '@mantine/core'
import React, { useState } from 'react'
import { User } from '../../../types'
import ChangeNickname from './ChangeNickname'

interface PropTypes {
    user: User
}

const EditProfile = ({ user }: PropTypes) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title='Edit Profile'>
                <ChangeNickname user={user} />
            </Modal>
            <Button variant='outline'
            sx={(theme) => ({
                color: theme.colorScheme === "dark"
                ? theme.colors.gray[0]
                : theme.colors.gray[9],
                borderColor: theme.colorScheme === "dark"
                ? theme.colors.gray[0]
                : theme.colors.gray[9],
            })}
            onClick={() => setModalOpen(true)}>
                Edit Profile
            </Button>
        </div>
    )
}


export default EditProfile