import puppeteer from 'puppeteer'
import mark from '../../utils/elements/mark'
import log from '../../utils/elements/log'
import getVisiblePost from '../../services/post/selectors/getVisiblePost'
import getNextPost from '../../services/post/selectors/getNextPost'
import scrollToNextPost from '../../services/post/scrollToNextPost'
import openLikesDialog from '../../services/likesDialog/openLikesDialog'
import getLikes from '../../services/post/getLikes'
import likePost from '../../services/post/likePost'

import followPersonsWhoLiked from '../../controllers/followPersonsWhoLiked'
import followingBot from '../../controllers/followingBot'
import login from '../../controllers/login'

export default async (page: puppeteer.Page) => {
  await page.exposeFunction('click', query => page.click(query))
  await page.exposeFunction('mark', async query => {
    const element = await page.$(query)
    if(element === null)
      throw `Nie ma elementu "${query}"`
    
    return await mark(element)
  })
  await page.exposeFunction('getVisiblePost', async () =>
    log(await getVisiblePost(page))
  )
  await page.exposeFunction('getNextPost', async () =>
    log(await getNextPost(page))
  )
  await page.exposeFunction('scrollToNextPost', () => scrollToNextPost(page))
  await page.exposeFunction('openLikesDialog', async () => 
    await openLikesDialog(
      await getVisiblePost(page)
    )
  )
  await page.exposeFunction('getLikes', async () => 
    await getLikes(
      await getVisiblePost(page)
    )
  )
  await page.exposeFunction('followPersonsWhoLiked', maximum => followPersonsWhoLiked(page, maximum))
  await page.exposeFunction('followingBot', maximum => followingBot(page, maximum))
  await page.exposeFunction('likePost', async () =>
    await likePost(
      await getVisiblePost(page)
    )
  )
  await page.exposeFunction('login', () => login(page))
}