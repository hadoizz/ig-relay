import loadPage from './loaders/page'
import loadSubscribers from './loaders/subscibers'

;(async () => {
  const page = await loadPage()
  await loadSubscribers(page)

  if(process.send)
    process.send({ type: 'started' })
})()

process.on('uncaughtException', error => {
  console.log(`Błąd aplikacji:`, error)
})