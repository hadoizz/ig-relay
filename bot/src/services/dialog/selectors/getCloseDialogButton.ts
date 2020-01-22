import { Page } from 'puppeteer'
import CloseDialogButton from '../../../types/dialog/CloseDialogButton'

export default async (page: Page): Promise<CloseDialogButton> => {
  const closeDialogButton = await page.$('div[role="dialog"]:first-child button:last-child')
  if(closeDialogButton === null)
    throw `Nie ma przycisku zamknięcia dialogu`

  return closeDialogButton
}