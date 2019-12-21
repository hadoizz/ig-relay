import { isSlave, master } from 'fork-with-emitter'
import loadPage from './loaders/page'
import loadSubscribers from './loaders/subscibers'

process.on('unhandledRejection', err => {
  console.error(err)
})

const starting = (async () => {
  console.log('Loading page...')
  const page = await loadPage()
  console.log('Page loaded')
  await loadSubscribers(page)
})()

if(isSlave){
  master.onRequest('start', () => starting)
}