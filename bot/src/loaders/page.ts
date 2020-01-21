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
  console.log('x1')
  const browser = await puppeteer.launch({
    headless: getEnvData().production 
      ? true 
      : getEnvData().headless,
    userDataDir: resolve('data'),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  })
  browser.on('disconnected', () => {
    throw 'Browser disconnected'
  })
  
  console.log('x2')
  const page = await browser.newPage()
  page.on('error', msg => {
    throw 'Page crashed'
  })

  console.log('x3')
  await page.emulate(device)
  console.log('x4')
  await exposeDevFns(page)
  console.log('x5')
  await page.goto('https://instagram.com/')

  return page
}