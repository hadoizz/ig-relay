import getConfig from 'next/config'

const { publicRuntimeConfig: { SERVER_URL } } = getConfig()

export default () => SERVER_URL
  ? SERVER_URL
  : `${location.protocol}//${location.hostname}:8080`