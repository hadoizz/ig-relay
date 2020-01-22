import { Page } from 'puppeteer'

const getBtn = async (page: Page) => {
  const btn = await page.$('form button')
  if(btn === null)
    throw `Can't select submit form button`

  return btn
}

export default async (page: Page) =>
  await (await getBtn(page)).click()