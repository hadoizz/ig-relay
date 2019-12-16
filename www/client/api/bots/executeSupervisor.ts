import fetch from '../fetch'

export default async (id: string, name: string, payload: any) => {
  const body = await fetch(`/bots/${id}/executeSupervisor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, payload })
  })
  const { result } = await body.json()
  
  return result
}