import { Page } from 'puppeteer';
import submitForm from '../services/navigation/submitForm';
import sleep from '../utils/sleep';

export default async (page: Page, code: string) => {
  //initial message
  await submitForm(page)

  await sleep(3000, 6000)

  //form with code
  
}