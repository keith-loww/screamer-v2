import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <UserProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withCSSVariables >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </UserProvider>
  )
}

export default MyApp
