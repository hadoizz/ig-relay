import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

export interface RequiredAccountData {
  login: string
}

export default async (data: RequiredAccountData) => {
  const body = await fetch(`${getServerHost()}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const {accountId} = (await body.json())
  return accountId
}