import { Page } from 'puppeteer'
import getCredentials from '../config/getCredentials'
import typeCredentials from '../services/login/typeCredentials'
import submitCredentials from '../services/login/submitCredentials'
import sleep from '../utils/sleep'
import log from '../logs/log'
import isChallenge from '../services/login/isChallenge'
import submitForm from '../services/navigation/submitForm'
import clickButton from '../services/navigation/clickButton'
import gotoIndex from '../services/index/gotoIndex'
import closeDialog from '../services/dialog/closeDialog'
import scrollTo from '../utils/elements/scrollTo'
import getFirstPost from '../services/post/selectors/getFirstPost'
import scrollToNextPost from '../services/post/scrollToNextPost'

const path = '/accounts/login'

/*
  Zapisać Twoje dane logowania?
  Możemy zapisać Twoje dane logowania w tej przeglądarce, aby uniknąć konieczności ich ponownego wprowadzania.

  Zapisz informacje

  Nie teraz
*/
const oneTapPath = '/accounts/onetap'

type Response = 'success' | 'challenge' | 'error'

export default async (page: Page, credentials = getCredentials()): Promise<Response> => {
  console.log(`Login as ${credentials.login}`)

  await page.goto(`https://instagram.com${path}?source=auth_switcher`)
  
  //page was redirected to main page - user already logged in
  if(!page.url().includes(path)){
    console.log(`User was already logged in`)
    log('login', 'already_logged_in')
    return 'success'
  }

  await sleep(1000, 3000)

  await typeCredentials(page, credentials)
  await submitCredentials(page)

  await sleep(8000, 12000)

  if(page.url().includes(path)){
    console.log(`Can't log in (${credentials.login})`)
    log('login', 'error')
    return 'error'
  }

  if(await isChallenge(page)){
    //skip info about challenge
    await submitForm(page)
    await sleep(3000, 6000)
    log('login', 'challenge')
    return 'challenge'
  }

  if(page.url().includes(oneTapPath)){
    log('onetap')
    await clickButton(page)
    await sleep(3000, 6000)
  }

  try {
    await closeDialog(page)
    await sleep(1000, 2000)
  } catch(error) {}

  await gotoIndex(page)
  await sleep(1000, 2000)
  await scrollTo(await getFirstPost(page))
  await sleep(1000, 2000)
  await scrollToNextPost(page)
  await sleep(1000, 2000)
  await scrollToNextPost(page)

  log('login', 'success')
  return 'success'
} 