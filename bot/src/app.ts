import loadPage from './loaders/page'
import loadSubscribers from './loaders/subscibers'
import loadIpc from './loaders/ipc'

process.on('unhandledRejection', err => {
  console.error(err)
})

;(async () => {
  const page = await loadPage()
  await loadSubscribers(page)
  await loadIpc()
})()