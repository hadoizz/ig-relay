export default (path: string, props?: object) => {
  path = `http://localhost:8080${path}`
  return fetch(path, props)
}