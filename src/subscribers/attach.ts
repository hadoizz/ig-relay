import onFollow from './onFollow'
import onLikePost from './onLikePost'
import onLogin from './onLogin'
import onFailedLogin from './onFailedLogin'

export default () => {
  onFollow()
  onLikePost()
  onLogin()
  onFailedLogin()
}