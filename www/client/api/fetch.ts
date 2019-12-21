export const getUrl = (path: string) =>
  `${location.protocol}//${location.hostname}:8080${path}`

export default (path: string, props?: object) =>
  fetch(getUrl(path), props)