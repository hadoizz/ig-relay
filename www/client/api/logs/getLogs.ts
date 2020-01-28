import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'
import { Log } from '../../types/Log'

export default async (accountId: number) => {
  const body = await fetch(`${getServerHost()}/logs/account/${accountId}`)
  return await body.json() as Log
}