import puppeteer from 'puppeteer-extra'
import devices from 'puppeteer/DeviceDescriptors'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import { resolve } from 'path'
import exposeDevFns from './page/exposeDevFns'
import getEnvData from '../config/getEnvData'

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())

const device = devices['Pixel 2']

export default async () => {
  const browser = await puppeteer.launch({
    headless: getEnvData().headless,
    userDataDir: resolve('data'),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  })
  browser.on('disconnected', () => {
    throw 'Browser disconnected'
  })
  
  const page = await browser.newPage()
  page.on('error', msg => {
    throw 'Page crashed'
  })

  await page.emulate(device)
  await exposeDevFns(page)
  await page.goto('https://instagram.com/')

  return page
}