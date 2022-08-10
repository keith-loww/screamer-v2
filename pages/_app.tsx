import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ModalsProvider } from '@mantine/modals';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  
  const [primaryColor, setPrimaryColor] = useState("blue");

  useEffect(() => {
    setPrimaryColor(colorScheme === "dark" ? "blue" : "pink");
  } ,[colorScheme]);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    setPrimaryColor(primaryColor === 'blue' ? 'pink' : 'blue');
  }

  return (
    <UserProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
        <MantineProvider withGlobalStyles withNormalizeCSS
         theme={{ 
          colorScheme,
          colors: {
            brand: ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82','#AD1374' ],
          },
          primaryColor,
          }} >
          <NotificationsProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </UserProvider>
  )
}

export default MyApp
