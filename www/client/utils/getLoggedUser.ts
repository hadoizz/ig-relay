import nextCookie from 'next-cookies'
import getServerHost from './getServerHost'
import redirectOnError from './redirectOnError'

export default async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/auth/profile'

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })

    if(response.ok){
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError(ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx)
  }
}