import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/HomePage/Footer'
import NavBar from '../components/HomePage/NavBar'

export default function DeletedPage() : NextPage {
    return (<>
        <Head>
            <html data-theme="business"></html>
            <title>POST DELETED</title>
        </Head>
        <NavBar />
        <div className='p-6 flex justify-center items-center flex-col space-y-4'>
            <h1 className='text-4xl font-bold'>POST SUCCESSFULLY DELETED</h1>
            <Link
            href="/" >
                <button className="btn text-2xl">HOME PAGE</button>
            </Link>
        </div>
        <Footer />
    </>)
}