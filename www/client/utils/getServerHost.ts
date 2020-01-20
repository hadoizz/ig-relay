import { Request } from 'express'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

function getServerHost(req?: Request) {
  const host = publicRuntimeConfig.SERVER_HOST || req?.headers?.host || ''

  /*if (host.startsWith('localhost')) {
    return `http://${host}`
  }
  return `https://${host}`*/

  return `http://${host}`
}

export default getServerHost