import { Injectable } from '@nestjs/common'
import { BotsService } from '../bots/bots.service'

interface Streams {
  [botId: string]: {
    lastData: string,
    connectedClients: number
  }
}

@Injectable()
export class StreamingService {
  constructor(private readonly botsService: BotsService){}

  private streams: Streams = Object.create(null)

  getLastData(id: string){
    return (this.streams[id] && this.streams[id].lastData)
      ? this.streams[id].lastData
      : null
  }

  private updateLastData = (id: string) => {
    return (data: string) =>
      this.streams[id].lastData = data
  }

  private startStreaming(id: string){
    this.streams[id] = { 
      lastData: '', 
      connectedClients: 0
    }
    this.attachStreamingHandler(id, this.updateLastData)
    this.orderBotToStartStreaming(id)

    console.log(`Start streaming ${id}`)
  }

  private stopStreaming(id: string){
    this.detachStreamingHandler(id, this.updateLastData)
    this.orderBotToStopStreaming(id)
    delete this.streams[id]

    console.log(`Stop streaming ${id}`)
  }

  private attachStreamingHandler(id: string, handler: (data: string) => void){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).fork.on('streaming', handler)
  }

  private detachStreamingHandler(id: string, handler: (data: string) => void){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).fork.removeListener('streaming', handler)
  }

  private orderBotToStartStreaming(id: string){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).fork.emit('startStreaming')
  }

  private orderBotToStopStreaming(id: string){
    if(!this.botsService.hasBot(id))
      return
      
    this.botsService.getBot(id).fork.emit('stopStreaming')
  }

  createStreaming(id: string, handleData: (data: string) => void){
    //bot doesn't exist
    if(!this.botsService.hasBot(id))
      return

    if(!this.streams[id])
      this.startStreaming(id)
    
    this.streams[id].connectedClients++
    this.attachStreamingHandler(id, handleData)

    //cleanup
    return () => {
      this.streams[id].connectedClients--
      this.detachStreamingHandler(id, handleData)

      if(this.streams[id].connectedClients === 0)
        this.stopStreaming(id)
    }
  }
}
