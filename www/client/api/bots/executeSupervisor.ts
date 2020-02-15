import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

export default async (botId: string, name: string, payload?: any) => {
  const body = await fetch(`${getServerHost()}/bots/${botId}/executeSupervisor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, payload })
  })
  const { result } = await body.json()
  return result
}