import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

export default async (accountId: number) => {
  await fetch(`${getServerHost()}/accounts/${accountId}/logged`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
}