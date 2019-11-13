import { onProcessMessage } from '../emitter'

export default async () => {
  if(process.send)
    process.send({ type: 'started' })
  
  process.on('message', message => {
    if(typeof message !== 'object' && typeof message.type !== 'string')
      return

    onProcessMessage.emit(message)
  })
}