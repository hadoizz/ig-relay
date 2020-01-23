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

  const cookies = Object.entries(getEnvData().cookies).reduce((cookies: any[], [name, value]) => {
    cookies.push({
      name,
      //@ts-ignore
      value,
      domain: '.instagram.com',
      path: '/',
      httpOnly: true,
      secure: true,
      expires: Math.round(+new Date(new Date().setFullYear(new Date().getFullYear() + 1))/1000)
    })
    return cookies
  }, [])

  await page.emulate(devices['Pixel 2'])
  await exposeDevFns(page)

  await page.setCookie(...cookies)
  await page.goto('https://instagram.com/')

  //await page.evaluate(sessionid => document.cookie = `sessionid=${sessionid}`, '2859946592%3AYzIhmdX9OP2bYr%3A29')
  
  console.log(getEnvData().cookies)
  
  //@ts-ignore
  await page.evaluate(cookies => cookies.map(([name, value]) => { document.cookie=`${name}=${value}` }), Object.entries(getEnvData().cookies))

  await page.reload()

  //sometimes weird shit happens and page loads infinitely (but is usable)
  await page.evaluate(() => window.stop())

  return page
}