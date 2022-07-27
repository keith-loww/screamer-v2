import { Group, Stack, Text } from '@mantine/core'
import React from 'react'
import { SiNextdotjs, SiAuth0 } from 'react-icons/si'

const Technologies = () => {
    return (
        <div>
            <h2>Technologies</h2>
            <div>
                <h3>
                    <Group>
                        NextJs
                        <SiNextdotjs />
                    </Group>
                </h3>
                <p>
                    SCREAMER is built using NextJs, a framework for building server-side rendered applications.
                    Server side rendering is a technique that allows the server to render the page before the client is able to. 
                    This allows the server to render the page without the client having to wait for the page to load.
                    This results in faster page loads and a better user experience.
                </p>
            </div>
        </div>
    )
}

export default Technologies