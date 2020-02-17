import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

export default async (accountId: number) => {
  const body = await fetch(`${getServerHost()}/accounts/${accountId}`, {
    method: 'DELETE'
  })
  const deleted = await body.json() as boolean
  return deleted
}