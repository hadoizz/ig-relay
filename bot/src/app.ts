import { isSlave, master } from 'fork-with-emitter'
import loadPage from './loaders/page'
import loadSubscribers from './loaders/subscibers'
import log from './logs/log'
import getCredentials from './config/getCredentials'

process.on('unhandledRejection', err => {
  log('error', err)
  process.exit(1)
})

const starting = (async () => {
  console.log('Loading page...')
  const page = await loadPage()
  console.log('Page loaded')
  await loadSubscribers(page)

  log('start')
})()

if(isSlave){
  master.onRequest('start', () => starting)
}

console.log(JSON.stringify(getCredentials(), null, ' '))