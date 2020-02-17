import { Page } from 'puppeteer'
import sleep from 'sleep-promise'
import decamelize from 'decamelize'
import { master } from 'fork-with-emitter'
import { getSupervisorsWithTypes } from '../supervisors'
import log from '../logs/log'

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

const getScreenshotTime = async (page: Page) => {
  const ts = Date.now()
  await page.screenshot({ encoding: 'base64', type: 'jpeg' })
  return Date.now() - ts
}

const createStreaming = (page: Page) => {
  const _ms = getScreenshotTime(page)
  _ms.then(ms => console.log(`Screenshot took ${(ms/1000).toFixed(1)}s`))

  const stream = async () => {
    master.emit('streaming', await page.screenshot({ encoding: 'base64', type: 'jpeg' }))
  }

  let timer: null | NodeJS.Timeout = null
  return {
    async startStreaming(){
      if(timer !== null)
        return
      
      const interval = (await _ms) * 2
      timer = setInterval(stream, interval)
      console.log(`Started streaming with interval ${(interval/1000).toFixed(1)}s`)
    },
    stopStreaming(){
      if(timer === null)
        return

      clearInterval(timer)
      console.log(`Streaming stopped`)
    }
  }
}

export default (page: Page) => {
  const supervisors = getSupervisorsWithTypes(page)

  master.on('exit', exit)

  master.onRequest('getSupervisors', () =>
    Object.entries(supervisors)
      .map(([ name, { type, supervisor } ]) => ({
        title: decamelize(name, ' '),
        name,
        arity: supervisor.length,
        type
      }))
  )

  master.onRequest('executeSupervisor', async ({ name, payload }: { name: string, payload: any }) => { 
    if(payload === undefined)
      log('supervisor', `${name}()`)
    else if(name === 'login')
      log('supervisor', `${name}(${JSON.stringify({
        ...payload,
        password: '*'.repeat(payload.password.length)
      })}`)
    else if(typeof payload === 'object')
      log('supervisor', `${name}(${JSON.stringify(payload)})`)
    else
      log('supervisor', `${name}(${payload})`)

    if(!supervisors.hasOwnProperty(name))
      throw 'Invalid supervisor name'
    
    console.log(`at ${page.url()}`)

    try {
      const value = await supervisors[name].supervisor(payload)
      log('success')
      return value
    } catch(error) {
      await page.screenshot({ path: 'error.png' })
      log('error', error instanceof Error
        ? error.message
        : error.split('\n')[0])
    }
  })

  const { startStreaming, stopStreaming } = createStreaming(page)
  master.on('startStreaming', startStreaming)
  master.on('stopStreaming', stopStreaming)
}