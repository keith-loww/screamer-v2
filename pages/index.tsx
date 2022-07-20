import { useUser } from '@auth0/nextjs-auth0'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/HomePage/Footer'
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
  const {user} = useUser();
  
  return (
    <>
      <Head>
        <title>Screamer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className='p-2 flex flex-col items-center'>{user ? <NewPostForm /> : null}</div>
      <PostsDisplay
      posts={posts} />
      <Footer />
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
