import { Page } from 'puppeteer'
import getVisiblePost from '../services/post/selectors/getVisiblePost'
import scrollToNextPost from '../services/post/scrollToNextPost'
import getLikes from '../services/post/getLikes'
import openLikesDialog from '../services/likesDialog/openLikesDialog'
import followPersonsWhoLiked from './followPersonsWhoLiked'
import closeDialog from '../services/dialog/closeDialog'
import likePost from '../services/post/likePost'
import { onLikePost } from '../emitter'
import sleep from '../utils/sleep'
import Counter from '../lib/Counter'

export default async (page: Page, maximum?: number) => {
  let followCount = new Counter

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
      return
    }

    await scrollToNextPost(page)
    await sleep(500, 2000)
  }
}