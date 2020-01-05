import fetch from 'isomorphic-unfetch'
import getServerHost from '../../utils/getServerHost'

export default async (id: string) => {
  const body = await fetch(`${getServerHost()}/bots/${id}/getSupervisors`)
  const supervisors = await body.json()
  
  return supervisors
}