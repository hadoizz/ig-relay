import { Injectable } from '@nestjs/common'
import { BotsService } from '../bots/bots.service'

interface Streams {
  [botId: string]: {
    lastData: string,
    connectedClients: number,
    handleUpdateLastData: (data: string) => void
  }
}

@Injectable()
export class StreamingService {
  constructor(private readonly botsService: BotsService){}

  private streams: Streams = Object.create(null)

  private getLastData(id: string){
    return this.streams[id].lastData
  }

  private startStreaming(id: string){
    const handleUpdateLastData = (data: string) => {
      this.streams[id].lastData = data 
    }

    this.streams[id] = { 
      lastData: '', 
      connectedClients: 0,
      handleUpdateLastData
    }
    this.attachStreamingHandler(id, handleUpdateLastData)
    this.orderBotToStartStreaming(id)

    console.log(`Start streaming ${id}`)
  }

  private stopStreaming(id: string){
    this.detachStreamingHandler(id, this.streams[id].handleUpdateLastData)
    this.orderBotToStopStreaming(id)
    delete this.streams[id]

    console.log(`Stop streaming ${id}`)
  }

  private attachStreamingHandler(id: string, handler: (data: string) => void){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).slave.on('streaming', handler)
  }

  private detachStreamingHandler(id: string, handler: (data: string) => void){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).slave.removeListener('streaming', handler)
  }

  private orderBotToStartStreaming(id: string){
    if(!this.botsService.hasBot(id))
      return

    this.botsService.getBot(id).slave.emit('startStreaming')
  }

  private orderBotToStopStreaming(id: string){
    if(!this.botsService.hasBot(id))
      return
      
    this.botsService.getBot(id).slave.emit('stopStreaming')
  }

  createStreaming(id: string, handleData: (data: string) => void){
    //bot doesn't exist
    if(!this.botsService.hasBot(id))
      return

    if(!this.streams[id])
      this.startStreaming(id)
    
    this.streams[id].connectedClients++
    this.attachStreamingHandler(id, handleData)

    if(this.getLastData(id))
      handleData(this.getLastData(id))

    //cleanup
    return () => {
      this.streams[id].connectedClients--
      this.detachStreamingHandler(id, handleData)

      if(this.streams[id].connectedClients === 0)
        this.stopStreaming(id)
    }
  }
}
