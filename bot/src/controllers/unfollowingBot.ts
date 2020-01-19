import { Page } from 'puppeteer';
import gotoFollowing from '../services/myProfile/following/gotoFollowing';
import getFollowingList from '../services/myProfile/following/selectors/getFollowingList';
import getNextElement from '../utils/elements/getNextElement';
import getPerson from '../services/personRow/getPerson';
import { master } from 'fork-with-emitter';
import log from '../logs/log';
import unfollow from '../services/personRow/unfollow';
import sleep from '../utils/sleep';
import gotoIndex from '../services/index/gotoIndex';

export default async (page: Page, maximumUnfollows: number) => {
  if(!maximumUnfollows)
    throw `Missing maximumUnfollows`

  await gotoFollowing(page)

  const followingList = await getFollowingList(page)
  let personRow
  while(personRow = await getNextElement(followingList)){
    const person = await getPerson(personRow)
    console.log(person)
    const shouldBeUnfollowed = await master.request('shouldBeUnfollowed')
    if(shouldBeUnfollowed){
      await unfollow(personRow)
      log('unfollowed', person.login)
      await sleep(250, 750)
      continue
    }

    if(--maximumUnfollows === 0){
      await gotoIndex(page)
      return
    }

    await sleep(100, 300)
  }
}