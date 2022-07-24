import { useUser } from '@auth0/nextjs-auth0'
import { AppShell, Divider } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/HomePage/NavBar'
import NewPostForm from '../components/HomePage/NewPostForm'
import PostsDisplay from '../components/HomePage/PostsDisplay'
import { Post } from '../components/types'
import dbConnect from '../lib/dbConnect'
import { getPostsWithAuthor } from './api/posts'

interface PropTypes {
  posts: Post[]
}

const Home : NextPage<PropTypes> = ({ posts } : PropTypes) => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>Screamer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
      header={<NavBar />}
      >
        <div className='flex justify-center'>
          <div className='w-full md:w-3/5 xl:w-2/5'>
            <div className='p-2 flex flex-col items-center'>
              {user
                ? <NewPostForm />
                : null}
            </div>
            <Divider my="xl" />
            <PostsDisplay
            posts={posts} />
          </div>
        </div>
      </AppShell>    
    </>
  )
}


export const getServerSideProps : GetServerSideProps = async () => {
  await dbConnect()
  const posts = JSON.parse(JSON.stringify(await getPostsWithAuthor()))

  return {
    props: {posts}
  }
}

export default Home
