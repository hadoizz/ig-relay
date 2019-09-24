import { Page } from 'puppeteer'
import getProfileUrl from './getProfileUrl'

export default async (page: Page) =>
  page.url() === await getProfileUrl()