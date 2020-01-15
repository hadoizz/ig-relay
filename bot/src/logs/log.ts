import { master, isSlave } from 'fork-with-emitter'

export default (type: string, payload?: any) => {
  console.log(type, payload)

  if(!isSlave)
    return

  master.emit('log', { type, payload })
}