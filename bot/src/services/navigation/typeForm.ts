import { Page } from 'puppeteer'
import random from 'random-int'

const getInput = async (page: Page) => {
  const input = await page.$('form input')
  if(input === null)
    throw `Can't select submit form input`

  return input
}

export default async (page: Page, text: string) => {
  const input = await getInput(page)

  //select input text if exists (typing will overwrite it)
  await input.click({ clickCount: 3 })

  await input.type(text, { delay: random(70, 120) })
}