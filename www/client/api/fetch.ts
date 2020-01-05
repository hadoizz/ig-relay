import getServerUrl from '../config/getServerUrl'

export const getFullUrl = (path: string) => {
  if(!path.startsWith('/'))
    path = `/${path}`

  return `${getServerUrl()}${path}`
}

export default async (path: string, data?: RequestInit) => {
  const headers = data?.headers || {}

  if(localStorage.getItem('access_token'))
    headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

  return await fetch(getFullUrl(path), {
    ...data,
    headers
  })
}