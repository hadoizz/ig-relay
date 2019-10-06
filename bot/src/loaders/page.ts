import puppeteer from 'puppeteer'
import args from './page/args'
import exposeDevFns from './page/exposeDevFns'

export default async () => {
  const browser = await puppeteer.launch({
    args,
    headless: false,
    ignoreHTTPSErrors: true,
    userDataDir: './data',
    ignoreDefaultArgs: ["--enable-automation"]
  })
  browser.on('disconnected', () => {
    console.log(`Browser disconnected`)
    process.exit(1)
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 400,
    height: 800
  })
  await exposeDevFns(page)
  await page.goto('https://instagram.com/')

  return page
}