import { Request } from 'express'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

function getClientHost(req?: Request) {
  const host = publicRuntimeConfig.CLIENT_HOST || req?.headers?.host || ''

  /*if (host.startsWith('localhost')) {
    return `http://${host}`
  }
  return `https://${host}`*/

  return `http://${host}`
}

export default getClientHost