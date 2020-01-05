import fetch from 'isomorphic-unfetch'
import getServerHost from '../../../utils/getServerHost'

export default async () => {
  const body = await fetch(`${getServerHost()}/bots/dev/start`)
  const { id } = await body.json()
  return id
}