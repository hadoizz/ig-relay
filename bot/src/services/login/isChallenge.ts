import { Page } from 'puppeteer';
import getFormInput from '../navigation/selectors/getFormInput';

export default async (page: Page) => {
  const isLink = Boolean(page.url().includes('instagram.com/challenge'))
  const isFormInput = await getFormInput(page) !== null

  return isLink && isFormInput
}