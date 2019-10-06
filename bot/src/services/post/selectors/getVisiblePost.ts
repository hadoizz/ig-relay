import { Page } from 'puppeteer'
import isVisible from '../../../utils/elements/isVisible'
import Post from '../../../types/post/Post'

export default async (page: Page): Promise<Post> => {
  const posts = await page.$$('article')
  for(const post of posts){
    if(await isVisible(post))
      return post
  }

  throw `Nie ma widocznego postu`
}