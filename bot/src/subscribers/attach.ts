import { Page } from 'puppeteer'
import onFollow from './onFollow'
import onLikePost from './onLikePost'
import onLogin from './onLogin'
import onFailedLogin from './onFailedLogin'
import onProcessMessage from './onProcessMessage'

export default (page: Page) => {
  onFollow()
  onLikePost()
  onLogin()
  onFailedLogin()
  onProcessMessage(page)
}