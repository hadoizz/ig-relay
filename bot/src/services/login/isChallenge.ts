import { Page } from 'puppeteer';

export default (page: Page) => {
  return page.url().includes('instagram.com/challenge')
}