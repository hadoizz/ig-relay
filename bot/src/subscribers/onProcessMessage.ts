import { Page } from 'puppeteer'
import sleep from 'sleep-promise'
import decamelize from 'decamelize'
import getSupervisors from '../getSupervisors'
import { onProcessMessage } from '../emitter'
import { master } from 'fork-with-emitter'

export default (page: Page) => {
  const supervisors = getSupervisors(page)

  const fns = {
    'exit': () =>
      //allow bot to send result
      setImmediate(async () => {
        try {
          page.browser().close()
        } catch(error) {
          process.exit(0)
        }

        //make sure process is terminated
        await sleep(5000)
        console.log(`Exit with process.exit after 5 seconds (browser is crashed)`)
        process.exit(0)
      }),
    'getSupervisors': () => 
      Object.entries(supervisors).map(([name, { length }]) => ({
        title: decamelize(name, ' '),
        name,
        arity: length
      })),
    ...supervisors
  }

  onProcessMessage.on(async ({ type, payload }) => {
    console.log(`Received message`, { type, ...payload && { payload } })

    //@ts-ignore
    const fn = fns[type]
    if(fn === undefined){
      console.log(`Unknown process message`, { type, ...payload && { payload } })
      return
    }

    try {
      const result = await new Promise(async resolve => {
        //resolve if function does not respond withing 2 seconds
        const timeoutHandler = setTimeout(resolve, 2000)

        //normal result
        const result = await fn(payload)
        clearTimeout(timeoutHandler)
        resolve(result)
      })

      if(!process.send)
        return

      process.send({ type: 'executed', payload: result })
    } catch(error) {
      console.log(`Execution error`, { type, ...payload && { payload } }, error)
    }
  })
}