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

const getNavigation = (page: Page) => ({
  type: 'navigation',
  supervisors: {
    gotoProfile: () =>
      gotoProfile(page),
    gotoFollowing: () =>
      gotoFollowing(page)
  }
})

const getServices = (page: Page) => ({
  type: 'services',
  supervisors: {
    getVisiblePost: async () =>
      log(await getVisiblePost(page)),
    getNextPost: async () =>
      log(await getNextPost(page)),
    scrollToNextPost: () =>
      scrollToNextPost(page),
    getLikes: async () =>
      await getLikes(await getVisiblePost(page)),
    likePost: async () =>
      await likePost(await getVisiblePost(page)),
    openLikesDialog: async () =>
      await openLikesDialog(await getVisiblePost(page)),
    closeDialog: () =>
      closeDialog(page)
  }
})

const getControllers = (page: Page) => ({
  type: 'controllers',
  supervisors: {
    followPersonsWhoLiked: (maximum?: number) =>
      followPersonsWhoLiked(page, maximum),
    followingBot: (maximum?: number) =>
      followingBot(page, maximum),
    login: () =>
      login(page),
    unfollowFollowed: () =>
      unfollowFollowed(page)
  }
})

interface Supervisors {
  [name: string]: (arg: any) => any
}
export const getSupervisors = (page: Page): Supervisors => {
  const navigation = getNavigation(page)
  const services = getServices(page)
  const controllers = getControllers(page)

  return { ...navigation.supervisors, ...services.supervisors, ...controllers.supervisors }
}

interface SupervisorsWithTypes {
  [name: string]: {
    type: string,
    supervisor: (arg: any) => any
  }
}
export const getSupervisorsWithTypes = (page: Page): SupervisorsWithTypes => {
  const navigation = getNavigation(page)
  const services = getServices(page)
  const controllers = getControllers(page)

  return [navigation, services, controllers].reduce((acc, { type, supervisors }) => {
    return {
      ...acc,
      ...Object.entries(supervisors).reduce((acc, [ key, supervisor ]) => {
        //@ts-ignore
        acc[key] = { type, supervisor }
        return acc
      }, {})
    }
  }, {})
}