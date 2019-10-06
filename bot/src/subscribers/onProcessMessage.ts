import { Page } from 'puppeteer'
import getSupervisors from '../getSupervisors'
import sleep = require('sleep-promise')

export default (page: Page) => {
  const supervisors = getSupervisors(page)

  const fns = {
    'exit': async () => {
      //browser could be crashed
      try {
        page.browser().close()
      } catch(error) {}

      //make sure process is terminated
      await sleep(5000)
      console.log(`Exit with process.exit after 5 seconds (browser could be crashed)`)
      process.exit(1)
    },
    ...supervisors
  }

  process.on('message', ({ type, payload }: { type: string, payload: any }) => {
    console.log(`Received message`, { type, ...payload && { payload } })

    try {
      //@ts-ignore
      fns[type](payload)
    } catch(error) {
      console.log(`Nieznana wiadomość do procesu (${type}, ${payload})`)
    }
  })
}