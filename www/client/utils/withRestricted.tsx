import Router from 'next/router'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import cookie from 'js-cookie'

const mapStateToProps = (state) => ({
  logged: Boolean(state.user)
})

const mapDispatchToProps = (dispatch) => ({
  logout: () =>
    dispatch({ type: 'logout' })
})

export default (WrappedPage: NextPage<any>) => {
  const WrapperPage = ({ logged, logout, ...props }) => {

    const checkForLogout = event => {
      if(event.key !== 'logout')
        return

      cookie.remove('token')
      logout()
      console.log('Logged out using browser storage')
    }

    useEffect(() => {
      window.addEventListener('storage', checkForLogout)

      return () => {
        window.removeEventListener('storage', checkForLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    if(!logged)
      Router.replace('/')

    return <WrappedPage {...props} />
  }

  WrapperPage.getInitialProps = async ctx => {
    const { checkedAuth, user } = ctx.store.getState()

    if(!checkedAuth)
      console.error(`Wtf! checkedAuth is not true`)

    if(user === null){
      process.browser
        ? Router.replace('/')
        : ctx.res.writeHead(302, { Location: '/' }).end()
    }

    return { 
      ...(WrappedPage.getInitialProps && (await WrappedPage.getInitialProps(ctx)))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WrapperPage)
}