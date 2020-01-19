import nextCookie from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import getServerHost from '../getServerHost'

export interface FollowedCount {
  count: number
  unfollowed: boolean
}

export default async (ctx) => {
  const { account } = ctx.store.getState()
  if(account === null)
    return null

  const { token } = nextCookie(ctx)
  const apiUrl = `${getServerHost(ctx.req)}/logs/account/${account.accountId}/followedCounts`

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      return await response.json() as FollowedCount[]
    } else {
      return null
    }
  } catch (error) {
    console.warn(error)
    return null
  }
}