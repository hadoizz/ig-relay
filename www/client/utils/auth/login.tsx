import cookie from 'js-cookie'
import Router from 'next/router'

/**
 * Remember to login with Redux 'login' action!
 */
export default (token: string) => {
  cookie.set('token', token, { expires: 7 })
  Router.push('/')
}