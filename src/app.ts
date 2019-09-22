import loadPage from './loaders/page'
import loadSubscribers from './loaders/subscibers'

;(async () => {
  const page = await loadPage()
  await loadSubscribers()
})()