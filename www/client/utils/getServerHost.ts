import { Request } from 'express'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

function getServerHost(req?: Request) {
  const host = publicRuntimeConfig.SERVER_HOST
  if(host)
    return `http://${host}`

  if(process.browser)
    return `http://${location.hostname}:8080`

  return `http://${req.headers.host.split(':')[0]}:8080`
}

export default getServerHost