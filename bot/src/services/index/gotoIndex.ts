import { Page } from 'puppeteer'
import sleep from '../../utils/sleep'

export default async (page: Page) => {
  await page.evaluate(() => location.pathname = '/')
  await sleep(2000, 4000)
}