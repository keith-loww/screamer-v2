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
            color={'gray'}
            onClick={() => setModalOpen(true)}>
                Edit Profile
            </Button>
        </div>
    )
}


export default EditProfile