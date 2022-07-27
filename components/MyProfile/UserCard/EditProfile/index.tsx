import { Button, Modal } from '@mantine/core'
import React, { useState } from 'react'
import { User } from '../../../types'

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
                Hello
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