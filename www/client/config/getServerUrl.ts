const SERVER_PORT = 8080

export default () => {
  return `${location.protocol}//${location.hostname}:${SERVER_PORT}`
}