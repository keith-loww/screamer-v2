import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function NewPostForm(): JSX.Element | null {
    const {user, isLoading} = useUser();
    const { register, reset, handleSubmit } = useForm();

    if (!user || isLoading) return null
    
    const submitHandler = () => {
        console.log("submitted lmao");
    }


    return (
        <div className='card'>
            <div className='card-body'>
                <h1 className='text-xl font-semibold'>
                    HEY, {user.name?.toUpperCase()}
                </h1>
                <form onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col space-y-2">
                    <textarea {...register("content")}
                    placeholder="SCREAM HERE..."
                    className="input input-bordered w-96 h-32" />
                    <button className='btn w-32'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}