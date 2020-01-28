import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'
import { Log } from '../../types/Log'

interface FollowedCount {
  count: number
  unfollowed: boolean
}

export default async (accountId: number) => {
  const body = await fetch(`${getServerHost()}/logs/account/${accountId}/followedCounts`)
  return await body.json() as FollowedCount[]
}