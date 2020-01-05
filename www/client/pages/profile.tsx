import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../utils/auth'
import getServerHost from '../utils/getServerHost'
import Layout from '../components/Layout'

const Profile = props => {
  const { username } = props

  return (
    <Layout>
      <h1>{username}</h1>
    </Layout>
  )
}

Profile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/auth/profile'

  const redirectOnError = () =>
    process.browser
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })

    if(response.ok){
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

export default withAuthSync(Profile)
