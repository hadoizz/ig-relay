import fetch from 'isomorphic-unfetch'
import getServerHost from '../../utils/getServerHost'

export default async (id: string, name: string, payload: any) => {
  const body = await fetch(`${getServerHost()}/bots/${id}/executeSupervisor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, payload })
  })
  const { result } = await body.json()
  
  return result
}