import { ElementHandle } from 'puppeteer'
import getData from './dataset/getData'
import addData from './dataset/addData'

const dataKey = 'marked'

/*
  Function called in loop in async function iterates throught children.
  Returns next children or null if it is end of list.

  Example:
  while(true){
    const personRow = await getNextElement(container)
    if(personRow === null)
      break

    //do something with personRow
  }
*/
export default async (container: ElementHandle): Promise<ElementHandle | null> => {
  for(const child of await container.$$(':scope > *')){
    if(await getData(child, dataKey))
      continue
      
    await addData(child, dataKey, true)
    return child
  }

  return null
}