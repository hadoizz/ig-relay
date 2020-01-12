import nextCookie from 'next-cookies'
import getServerHost from '../getServerHost'

interface Job {
  login: string
  accountId: number
}

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