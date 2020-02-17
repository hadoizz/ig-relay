import { Page } from 'puppeteer'

const getBtn = async (page: Page) => {
  const btn = await page.$('button')
  if(btn === null)
    throw `Can't select button`

  return btn
}

export default async (page: Page) =>
  await (await getBtn(page)).click()