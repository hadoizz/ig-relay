import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'

export default async (input: RequestInfo, init: RequestInit = {}) => {
  init.headers = {
    ...init.headers,
    Authorization: `Bearer ${cookie.get('token')}`
  }

  return await fetch(input, init)
}