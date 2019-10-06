import { Page } from 'puppeteer'
import getSupervisors from '../getSupervisors'

export default (page: Page) => {
  const supervisors = getSupervisors(page)

  const fns = {
    'exit': () => {
      page.browser().close()
    },
    ...supervisors
  }

  process.on('message', ({ type, payload }: { type: string, payload: any }) => {
    console.log(`Process message`, { type, payload })

    try {
      //@ts-ignore
      fns[type](payload)
    } catch(error) {
      console.log(`Nieznana wiadomość do procesu (${type}, ${payload})`)
    }
  })
}