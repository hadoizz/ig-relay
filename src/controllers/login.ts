import { Page } from 'puppeteer'
import getCredentials from '../config/getCredentials'
import typeCredentials from '../services/login/typeCredentials'
import submitCredentials from '../services/login/submitCredentials'
import sleep from '../utils/sleep'

const path = '/accounts/login'

export default async (page: Page) => {
  await page.goto(`https://instagram.com${path}?source=auth_switcher`)
  
  //page was redirected to main page - user already logged in
  if(!page.url().includes(path)){
    console.log(`User was already logged in`)
    return
  }

  await sleep(1000, 3000)

  await typeCredentials(page, await getCredentials())
  await submitCredentials(page)

  await sleep(3000, 6000)

  if(page.url().includes(path))
    throw `Nie można zalogować (login ${(await getCredentials()).login})`

  console.log(`Logged in (${(await getCredentials()).login})`)
} 