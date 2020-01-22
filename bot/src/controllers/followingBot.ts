import { Page } from 'puppeteer'
import getVisiblePost from '../services/post/selectors/getVisiblePost'
import scrollToNextPost from '../services/post/scrollToNextPost'
import getLikes from '../services/post/getLikes'
import sleep from '../utils/sleep'
import gotoLikedBy from '../services/post/gotoLikedBy'
import getNextElement from '../utils/elements/getNextElement'
import getPersonList from '../services/likedBy/selectors/getPersonList'
import getPerson from '../services/personRow/getPerson'
import isFollowed from '../logs/isFollowed'
import log from '../logs/log'
import follow from '../services/personRow/follow'
import goBack from '../services/likedBy/goBack'
import scrollTo from '../utils/elements/scrollTo'
import getFollowers from '../services/profile/getFollowers'
import gotoIndex from '../services/index/gotoIndex'

const getFollowersFromLogin = async (page: Page, login: string) => {
  const _page = await page.browser().newPage()
  await _page.goto(`https://instagram.com/${login}`)
  const followers = await getFollowers(_page)
  await _page.close()
  return followers
}

export default async (page: Page, maximumFollows: number) => {
  if(!maximumFollows)
    throw `Missing maximumFollows`

  await gotoIndex(page)

  let firstTick = true
  while(true){
    const post = await getVisiblePost(page)
    if(firstTick){
      await scrollTo(post)
      firstTick = false
    }
    await sleep(100, 1000)

    const likes = await getLikes(post)
    console.log(`Likes: ${likes}`)
    if(!likes || likes > 100){
      await scrollToNextPost(page)
      await sleep(100, 1000)
      continue
    }

    await gotoLikedBy(post)
    await sleep(1000, 2000)

    const personList = await getPersonList(page)
    let personRow
    while(personRow = await getNextElement(personList, { noScroll: true })){
      const person = await getPerson(personRow)
      console.log(person)
      if(person.isSelf || person.isFollowed || await isFollowed(person.login) || await getFollowersFromLogin(page, person.login) > 500){
        await scrollTo(personRow)
        await sleep(100, 300)
        continue
      }

      await sleep(250, 750)

      await follow(personRow)
      log('followed', person.login)

      await sleep(500, 2000)

      if(--maximumFollows === 0){
        await goBack(page)
        await sleep(500, 2000)
        return
      }

      await scrollTo(personRow)
    }

    await goBack(page)
  }

  /*let followCount = new Counter

  while(true){
    const post = await getVisiblePost(page)
    await likePost(post)
    await onLikePost.emit()
    await sleep(500, 2000)

    const likes = await getLikes(post)
    if(likes === 0 || likes > 50){
      await scrollToNextPost(page)
      await sleep(500, 2000)
      continue
    }

    await openLikesDialog(post)
    await sleep(1000, 2000)

    followCount.increase(
      maximum === undefined
        ? await followPersonsWhoLiked(page)
        : await followPersonsWhoLiked(page, maximum - followCount.getCount())
    )

    await closeDialog(page)
    await sleep(500, 2000)

    if(followCount.getCount() === maximum){
      console.log(`Reached maximum follow count (${maximum})`)
      break
    }

    await scrollToNextPost(page)
    await sleep(500, 2000)
  }*/
}