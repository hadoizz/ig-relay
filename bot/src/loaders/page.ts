import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import exposeDevFns from './page/exposeDevFns'
import { master } from 'fork-with-emitter'
import getEnvData from '../config/getEnvData'

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())

export default async () => {
  const browser = await puppeteer.launch({
    headless: getEnvData().headless,
    userDataDir: './data',
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

  setInterval(async () => {
    master.emit('screenshot', await page.screenshot({ encoding: 'base64' }))
  }, 500)

  return page
}