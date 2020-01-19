import nextCookie from 'next-cookies'
import fetch from 'isomorphic-unfetch'
import getServerHost from '../getServerHost'

export interface Job {
  jobId: number
  cron: string
  supervisor: string
  supervisorPayload: string
  maxDelaySeconds: string
}

export default async (ctx) => {
  const { account } = ctx.store.getState()
  if(account === null)
    return null

  const { token } = nextCookie(ctx)
  const apiUrl = `${getServerHost(ctx.req)}/jobs/account/${account.accountId}`

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      const jobs = await response.json() as Job[]
      return jobs
    } else {
      return null
    }
  } catch (error) {
    console.warn(error)
    return null
  }
}