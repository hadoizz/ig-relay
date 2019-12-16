import fetch from '../fetch'

export default async (id: string) => {
  const body = await fetch(`/bots/${id}/getSupervisors`)
  const supervisors = await body.json()
  
  return supervisors
}