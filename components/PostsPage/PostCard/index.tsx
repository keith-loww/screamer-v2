import { useUser } from '@auth0/nextjs-auth0'
import { Card, Divider } from '@mantine/core'
import React, { useState } from 'react'
import { Post } from '../../types'
import AvatarNameDateDisplay from './AvatarNameDateDisplay'
import LikeDisplay from './LikeDisplay'
import DropdownMenu from './DropdownMenu'
import CommentForm from './CommentForm'
import { useRouter } from 'next/router'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import { FaRegTrashAlt } from 'react-icons/fa'
import Content from './Content'
import deletePostConfirmModal from '../../../lib/posts/deletePostConfirmModal'

interface PropTypes {
    post: Post
}

const PostCard = ({ post }: PropTypes) => {
    const { user } = useUser()
    const router = useRouter()
    const [editMode, setEditMode] = useState(false)

    const deleteHandler = async () => {
        deletePostConfirmModal(post.id, router)
    }


    return (
        <Card
        p="xl"
        shadow="sm"
        className='w-full md:w-3/5 xl:w-2/5 my-2'>
            <div className='flex w-full flex-row justify-between'>
                <AvatarNameDateDisplay
                post={post} />
                {(user && user.sub === post.author.id)
                ? (
                    <div className='justify-end relative bottom-2'>
                        <DropdownMenu
                        setEditMode={setEditMode}
                        deleteHandler={deleteHandler} />
                    </div>
                ) : null}
            </div>
            <Content post={post} editMode={editMode} setEditMode={setEditMode} />
            <Divider my="md" />
            <LikeDisplay
            post={post} />
            {user
            ? (
                <div>
                    <Divider my="md" />
                    <CommentForm post={post} />
                </div>
                )
            : null}
        </Card>
    )
}

export default PostCard