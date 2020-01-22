import puppeteer from 'puppeteer-extra'
import devices from 'puppeteer/DeviceDescriptors'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import { resolve } from 'path'
import exposeDevFns from './page/exposeDevFns'
import getEnvData from '../config/getEnvData'

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())

export default async () => {
  const browser = await puppeteer.launch({
    headless: getEnvData().production 
      ? true 
      : getEnvData().headless,
    userDataDir: getEnvData().production
      ? undefined
      : resolve('data'),
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

  Object.entries(getEnvData().cookies).map(([ name, value ]) =>
    page.setCookie({
      name,
      //@ts-ignore
      value,
      domain: '.instagram.com',
      path: '/',
      httpOnly: true,
      secure: true,
      expires: Math.round(+new Date(new Date().setFullYear(new Date().getFullYear() + 1))/1000)
    })
  )

  await page.emulate(devices['Pixel 2'])
  await exposeDevFns(page)
  await page.goto('https://instagram.com/')

  return page
}