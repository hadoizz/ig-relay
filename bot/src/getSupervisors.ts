import { Page } from 'puppeteer'
import getVisiblePost from './services/post/selectors/getVisiblePost'
import log from './utils/elements/log'
import scrollToNextPost from './services/post/scrollToNextPost'
import getNextPost from './services/post/selectors/getNextPost'
import getLikes from './services/post/getLikes'
import likePost from './services/post/likePost'
import openLikesDialog from './services/likesDialog/openLikesDialog'
import gotoProfile from './services/profile/gotoProfile'
import gotoFollowing from './services/profile/following/gotoFollowing'
import followPersonsWhoLiked from './controllers/followPersonsWhoLiked'
import followingBot from './controllers/followingBot'
import login from './controllers/login'
import unfollowFollowed from './controllers/unfollowFollowed'
import closeDialog from './services/dialog/closeDialog'

export class Supervisors {
  constructor(private readonly page: Page){}

  /* services */
  getVisiblePost = async () =>
    log(await getVisiblePost(this.page))
  getNextPost = async () =>
    log(await getNextPost(this.page))
  scrollToNextPost = () =>
    scrollToNextPost(this.page)
  getLikes = async () =>
    await getLikes(await getVisiblePost(this.page))
  likePost = async () =>
    await likePost(await getVisiblePost(this.page))
  openLikesDialog = async () =>
    await openLikesDialog(await getVisiblePost(this.page))
  closeDialog = () =>
    closeDialog(this.page)

  /* navigation */
  gotoProfile = () =>
    gotoProfile(this.page)
  gotoFollowing = () =>
    gotoFollowing(this.page)

  /* controllers */
  followPersonsWhoLiked = (maximum?: number) =>
    followPersonsWhoLiked(this.page, maximum)
  followingBot = (maximum?: number) =>
    followingBot(this.page, maximum)
  login = () =>
    login(this.page)
  unfollowFollowed = () =>
    unfollowFollowed(this.page)
}

export default (page: Page) =>
  new Supervisors(page)