import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'

export default async (botId: string) => {
  const body = await fetch(`${getServerHost()}/bots/${botId}/supervisors`)
  return await body.json()
}