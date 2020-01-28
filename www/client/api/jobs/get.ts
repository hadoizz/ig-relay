import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'
import { Job } from '../../types/Job'

export default async (accountId: number) => {
  const body = await fetch(`${getServerHost()}/jobs/account/${accountId}`)
  return await body.json() as Job
}