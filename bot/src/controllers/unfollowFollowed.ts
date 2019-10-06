import { Page } from 'puppeteer'
import getNextElement from '../utils/elements/getNextElement'
import getFollowingContainer from '../services/profile/following/selectors/getFollowingContainer'
import getPerson from '../services/personRow/getPerson'
import gotoFollowing from '../services/profile/following/gotoFollowing'
import sleep from '../utils/sleep'

export default async (page: Page) => {
  await gotoFollowing(page)
  
  while(true){
    const personRow = await getNextElement(await getFollowingContainer(page))
    if(personRow === null)
      break

    console.log(
      await getPerson(personRow)
    )

    await sleep(300)
  }
}