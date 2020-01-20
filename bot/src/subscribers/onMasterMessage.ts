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

const createStreaming = (page: Page) => {
  let enabled = false
  let oldData = ''

  const emit = async () => {
    const data = await page.screenshot({ encoding: 'base64', type: 'jpeg' })
    if(data === oldData || !enabled)
      return

    oldData = data
    master.emit('streaming', data)
  }

  const streaming = async () => {
    await emit()
    setTimeout(() => enabled && streaming(), 200)
  }

  return { 
    startStreaming(){
      if(enabled)
        return
      
      enabled = true
      streaming()
      console.log('startStreaming')
    },
    stopStreaming(){
      if(!enabled)
        return
      
      enabled = false
      oldData = ''
      console.log('stopStreaming')
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
    log('supervisor', payload === undefined ? `${name}()` : `${name}(${payload})`)
    if(!supervisors.hasOwnProperty(name))
      throw 'Invalid supervisor name'

    const value = await supervisors[name].supervisor(payload)
    log('success')
    return value
  })

  const { startStreaming, stopStreaming } = createStreaming(page)
  master.on('startStreaming', startStreaming)
  master.on('stopStreaming', stopStreaming)
}