import puppeteer from 'puppeteer'
import args from './page/args'
import setFns from './page/setFns'

export default async () => {
  const browser = await puppeteer.launch({
    args,
    headless: false,
    ignoreHTTPSErrors: true,
    userDataDir: './data',
    ignoreDefaultArgs: ["--enable-automation"]
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 400,
    height: 800
  })
  await setFns(page)
  await page.goto('https://instagram.com/')

  return page
}