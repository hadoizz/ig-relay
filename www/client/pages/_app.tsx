import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import theme from '@material-ui/core/styles/defaultTheme'
import {createStore} from "redux"
import {Provider} from "react-redux"
import withRedux from "next-redux-wrapper"
import { Account } from '../types/Account'

type State = {
  user: null
  bot: {
    currentAccount: null | Account
  }
}

const initialState = (): State => ({
  user: null,
  bot: {
    currentAccount: null
  }
})

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'setCurrentAccount':
      return {
        ...state, 
        bot: {
          ...state.bot,
          currentAccount: action.payload
        }
      }
    default:
      return state
  }
}

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
}


class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  static async getInitialProps({Component, ctx}) {

    // we can dispatch from here too
    ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};

}

  render() {
    //@ts-ignore
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Head>
          <title>InstaFeed</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp)