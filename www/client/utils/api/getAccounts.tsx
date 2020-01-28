import nextCookie from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import getServerHost from '../getServerHost'
import {Account} from '../../types/Account'

export default async (ctx) => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/accounts'

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      const accounts: Account[] = await response.json()
      return accounts
    } else {
      return null
    }
  } catch (error) {
    console.warn(error)
    return null
  }
}