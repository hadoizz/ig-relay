import getServerUrl from '../config/getServerUrl'

export const getUrl = (path: string) =>
  `${getServerUrl()}${path}`

export default (path: string, props?: object) =>
  fetch(getUrl(path), props)