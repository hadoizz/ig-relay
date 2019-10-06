import { Page } from 'puppeteer'
import FollowingContainer from '../../../../types/profile/following/FollowingContainer'

export default async (page: Page): Promise<FollowingContainer> => {
  const [ followingContainer ] = await page.$x('//main//ul//li/..')
  if(followingContainer === undefined)
    throw `Nie ma kontenera z obserowanymi osobami (followingContainer)`

  return followingContainer
}