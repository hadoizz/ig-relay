import { Page } from 'puppeteer'
import getCloseDialogButton from './selectors/getCloseDialogButton'
import isDialog from './isDialog'

export default async (page: Page) => {
  const closeDialogButton = await getCloseDialogButton(page)
  await closeDialogButton.click()
}