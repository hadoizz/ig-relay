import { Page } from 'puppeteer';
import typeForm from '../services/navigation/typeForm';
import submitForm from '../services/navigation/submitForm';
import sleep from '../utils/sleep'
import isChallenge from '../services/login/isChallenge';
import log from '../logs/log';

type Response = 'success' | 'error'

export default async (page: Page, code: string): Promise<Response> => {
  await typeForm(page, code)
  await submitForm(page)

  await sleep(3000)

  if(await isChallenge(page)){
    log('challenge', 'error')
    return 'error'
  }

  log('challenge', 'success')
  return 'success'
}