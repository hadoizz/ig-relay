import { Request } from 'express'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

function getClientHost(req?: Request) {
  const host = publicRuntimeConfig.CLIENT_HOST
  if(host)
    return `http://${host}`

  if(process.browser)
    return `http://${location.hostname}:3000`

  return `http://${req.headers.host.split(':')[0]}:3000`
}

export default getClientHost