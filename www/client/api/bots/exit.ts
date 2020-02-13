import fetch from 'isomorphic-unfetch'
import getServerHost from '../../utils/getServerHost'

export default async (botId: string) =>
  //await fetch(`${getServerHost()}/bots/${botId}/exit`)
  navigator.sendBeacon(`${getServerHost()}/bots/${botId}/exit`)