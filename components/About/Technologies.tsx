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
            <div>
                <h3>
                    <Group>
                        Auth0
                        <SiAuth0 />
                    </Group>
                </h3>
                <p>
                    SCREAMER&#39;s user authentication is handled by Auth0. 
                    Auth0 is a third party authentication service that allows users to login to the application.
                    This way our users can rest assured that their information is safe and secure.
                </p>
            </div>
        </div>
    )
}

export default Technologies