import { Page } from 'puppeteer'
import sleep from 'sleep-promise'
import decamelize from 'decamelize'
import { master } from 'fork-with-emitter'
import getSupervisors, { Supervisors } from '../getSupervisors'

const exit = async (page: Page) => {
  try {
    page.browser().close()
  } catch(error) {
    process.exit(0)
  }

  //make sure process is terminated
  await sleep(5000)
  process.exit(0)
}

export default (page: Page) => {
  const supervisors = getSupervisors(page)

  master.onRequest('exit', () => setImmediate(exit))

  master.onRequest('getSupervisors', () => {
    return Object.entries(supervisors)
      .filter(([name]) => name !== 'page')
      .map(([name, { length }]) => ({
        title: decamelize(name, ' '),
        name,
        arity: length
      }))
  })

  master.onRequest('executeSupervisor', async ({ name, payload }: { name: keyof Supervisors, payload: any }) => {    
    console.log({ name, payload })
    return await supervisors[name](payload)
  })
}