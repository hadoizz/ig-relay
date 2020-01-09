import { Page } from 'puppeteer'
import log from './utils/elements/log'

//navigation
import gotoIndex from './services/index/gotoIndex'
import gotoProfile from './services/profile/gotoProfile'
import gotoFollowing from './services/profile/following/gotoFollowing'
import gotoLikedBy from './services/post/gotoLikedBy'
import goBackFromLikedBy from './services/likedBy/goBack'

import getVisiblePost from './services/post/selectors/getVisiblePost'
import scrollToNextPost from './services/post/scrollToNextPost'
import getNextPost from './services/post/selectors/getNextPost'
import getLikes from './services/post/getLikes'
import likePost from './services/post/likePost'
import unlikePost from './services/post/unlikePost'
import openLikesDialog from './services/likesDialog/openLikesDialog'
import followPersonsWhoLiked from './controllers/followPersonsWhoLiked'
import followingBot from './controllers/followingBot'
import login from './controllers/login'
import unfollowFollowed from './controllers/unfollowFollowed'
import closeDialog from './services/dialog/closeDialog'
import uploadPost from './services/uploadPost/uploadPost'

const navigationSupervisors = (page: Page) => ({
  gotoIndex: () =>
    gotoIndex(page),
  gotoProfile: () =>
    gotoProfile(page),
  gotoFollowing: () =>
    gotoFollowing(page),
  gotoLikedBy: async () =>
    await gotoLikedBy(await getVisiblePost(page)),
  goBackFromLikedBy: async () =>
    await goBackFromLikedBy(page)
})

const servicesSupervisors = (page: Page) => ({
  scrollToNextPost: () =>
    scrollToNextPost(page),
  getLikes: async () =>
    await getLikes(await getVisiblePost(page)),
  likePost: async () =>
    await likePost(await getVisiblePost(page)),
  unlikePost: async () =>
    await unlikePost(await getVisiblePost(page)),
  closeDialog: () =>
    closeDialog(page),
  //only works in browser (puppeteer mimits mobile device):
  //openLikesDialog: async () =>
  //  await openLikesDialog(await getVisiblePost(page)),
})

const controllersSupervisors = (page: Page) => ({
  //followPersonsWhoLiked: (maximum?: number) =>
  //  followPersonsWhoLiked(page, maximum),
  followingBot: (maximum?: number) =>
    followingBot(page, maximum),
  login: () =>
    login(page),
  //unfollowFollowed: () =>
  //  unfollowFollowed(page)
})

const devSupervisors = (page: Page) => ({
  logVisiblePost: async () =>
    log(await getVisiblePost(page)),
  logNextPost: async () =>
    log(await getNextPost(page)),
  identity: (value?: any) =>
    value,
  uploadPost: uploadPost(page)
})

const getAllSupervisors = (page: Page) => ({
  navigation: navigationSupervisors(page),
  services: servicesSupervisors(page),
  controllers: controllersSupervisors(page),
  dev: devSupervisors(page)
})

interface Supervisors {
  [name: string]: (arg: any) => any
}
export const getSupervisors = (page: Page): Supervisors => {
  const { navigation, services, controllers, dev } = getAllSupervisors(page)

  return {
    ...navigation,
    ...services,
    ...controllers,
    ...dev
  }
}

interface SupervisorsWithTypes {
  [name: string]: {
    type: string,
    supervisor: (arg: any) => any
  }
}
export const getSupervisorsWithTypes = (page: Page): SupervisorsWithTypes => {
  return Object.entries(getAllSupervisors(page)).reduce((acc, [ type, supervisors ]) => {
    Object.entries(supervisors).forEach(([ name, supervisor ]) => {
      //@ts-ignore
      acc[name] = { type, supervisor }
    })
    return acc
  }, {})
}