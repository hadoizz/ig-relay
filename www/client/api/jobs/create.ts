import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

interface Props {
  cron: string
  maxDelaySeconds: number
  supervisor: string
  supervisorPayload: string
}

export default async (accountId: number, data: Props) => {
  await fetch(`${getServerHost()}/jobs/account/${accountId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}