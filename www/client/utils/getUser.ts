import fetch from 'isomorphic-unfetch'
import getServerHost from './getServerHost'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export default async (ctx?: any) => {
  let token = ''

  if(ctx === undefined){
    if(!process.browser){
      console.error(`Missing ctx in getUser`)
      return null
    }

    token = cookie.get('token')
  } else {
    token = nextCookie(ctx).token
  }

  try {
    const response = await fetch(`${getServerHost(ctx?.req)}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })

    if(response.ok){
      return await response.json()
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}