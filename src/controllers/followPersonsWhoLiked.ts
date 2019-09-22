import { Page } from 'puppeteer'
import sleep from '../utils/sleep'
import getLikesDialog from '../services/likesDialog/selectors/getLikesDialog'
import scrollTo from '../utils/elements/scrollTo'
import follow from '../services/personRow/follow'
import { onFollow } from '../emitter'
import followedModel from '../models/followedModel'
import Counter from '../lib/Counter'
import getPerson from '../services/personRow/getPerson'
import getNextElement from '../utils/elements/getNextElement'
import PersonRow from '../types/personRow/PersonRow'

/*
  Follows persons from likes dialog, returns follow count.
  Make sure that likes dialog is opened.
*/
export default async (page: Page, maximum?: number) => {
  let followCount = new Counter

  const likePersonFromPersonRow = async (personRow: PersonRow) => {
    //get data from row
    const person = await getPerson(personRow)
    console.log(person)

    //check if like is added by user
    if(person.isUser){
      console.log(`Like is added by user`)
      return
    }

    //make sure person is not followed
    if(person.isFollowed){
      console.log(`Person was already followed`)
      return
    }

    //make sure person was not followed in the past
    if(await followedModel.wasFollowed(person)){
      console.log(`Person was followed in the past`)
      return
    }

    //follow person
    await follow(personRow)
    await followedModel.add(person)
    await onFollow.emit(person)
    followCount.increase()
  }

  const likesDialog = await getLikesDialog(page)

  while(true){
    const personRow = await getNextElement(likesDialog)  
    if(personRow === null)
      break
  
    //scroll to it
    await scrollTo(personRow)

    //like if it is available
    await likePersonFromPersonRow(personRow)

    //check if likes limit is reached
    if(maximum !== undefined && followCount.getCount() === maximum)
      break
    
    await sleep(500, 2000)
  }
  
  console.log(`Done!`)
  return followCount.getCount()
}
