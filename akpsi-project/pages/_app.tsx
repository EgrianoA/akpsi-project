import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Layout } from '../components/layout/layout';
import { LoginLayout } from '../components/layout/loginLayout'
import { useRouter } from 'next/router'

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({ Component, pageProps }: AppProps) {
   const router = useRouter()
   console.log(router)
   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
            {router?.route === '/login' ?
               <LoginLayout>
                  <Component {...pageProps} />
               </LoginLayout> :
               <Layout>
                  <Component {...pageProps} />
               </Layout>}

         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
