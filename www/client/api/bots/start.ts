import fetch from 'isomorphic-unfetch'
import getServerHost from '../../utils/getServerHost'

export default async (accountId: number): Promise<string> => {
  const body = await fetch(`${getServerHost()}/bots/start/account/${accountId}`)
  const { id } = await body.json()
  return id
}