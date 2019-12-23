import { Page } from 'puppeteer'
import sleep from 'sleep-promise'
import decamelize from 'decamelize'
import { master } from 'fork-with-emitter'
import { getSupervisorsWithTypes } from '../supervisors'

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
  let streaming: NodeJS.Timeout | null = null
  let oldData: string

  const emit = async () => {
    const data = await page.screenshot({ encoding: 'base64', type: 'jpeg' })
    if(data === oldData)
      return

    master.emit('streaming', data)
  }

  return { 
    startStreaming(){
      if(streaming !== null)
        return

      streaming = setInterval(emit, 300)
    },
    stopStreaming(){
      if(streaming === null)
        return
      
      clearInterval(streaming)
      streaming = null
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
    console.log({ name, payload })
    return await supervisors[name].supervisor(payload)
  })

  const { startStreaming, stopStreaming } = createStreaming(page)
  master.on('startStreaming', startStreaming)
  master.on('stopStreaming', stopStreaming)
}