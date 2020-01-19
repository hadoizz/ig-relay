import nextCookie from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import getServerHost from '../getServerHost'

export interface Log {
  type: string
  payload: string
  createdAt: string
}

export default async (ctx) => {
  const { account } = ctx.store.getState()
  if(account === null)
    return null

  const { token } = nextCookie(ctx)
  const apiUrl = `${getServerHost(ctx.req)}/logs/account/${account.accountId}`

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      return await response.json() as Log[]
    } else {
      return null
    }
  } catch (error) {
    console.warn(error)
    return null
  }
}