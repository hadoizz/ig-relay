import { Page } from 'puppeteer'
import getCredentials from '../config/getCredentials'
import typeCredentials from '../services/login/typeCredentials'
import submitCredentials from '../services/login/submitCredentials'
import sleep from '../utils/sleep'
import { onLogin, onFailedLogin } from '../emitter'
import log from '../logs/log'


const path = '/accounts/login'

export default async (page: Page) => {
  await page.goto(`https://instagram.com${path}?source=auth_switcher`)
  
  //page was redirected to main page - user already logged in
  if(!page.url().includes(path)){
    console.log(`User was already logged in`)
    return
  }

  const credentials = await getCredentials()

  await sleep(1000, 3000)

  await typeCredentials(page, credentials)
  await submitCredentials(page)

  await sleep(3000, 6000)

  if(page.url().includes(path)){
    await onFailedLogin.emit(credentials)
    throw `Nie można zalogować (${credentials.login})`
  }

  log('logged', credentials.login)
} 