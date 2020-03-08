import cookie from 'js-cookie'
import Router from 'next/router'

/**
 * Remember to logout with Redux 'logout' action!
 */
export default () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now().toString())
}