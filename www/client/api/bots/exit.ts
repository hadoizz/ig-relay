import fetch from 'isomorphic-unfetch'
import getServerHost from '../../utils/getServerHost'

export default async (id: string) =>
  await fetch(`${getServerHost()}/bots/${id}/exit`)