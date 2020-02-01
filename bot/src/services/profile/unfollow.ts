import { Page } from 'puppeteer';
import getUnfollowButton from './selectors/getUnfollowButton';

export default async (page: Page) => {
  const ub = await getUnfollowButton(page)
  ub.click()
}