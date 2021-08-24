/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  ApolloClient, InMemoryCache, ApolloProvider,
} from '@apollo/client';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import type { AppProps } from 'next/app';
import CommonDrawer from '../src/templates/commonDrawer';
import theme from '../src/components/theme';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: '/api/gql',
  cache,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles: Element | null = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CommonDrawer />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
export default MyApp;
