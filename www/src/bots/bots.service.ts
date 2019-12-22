import { Injectable } from '@nestjs/common'
import ms from 'ms'
import createBot, { Bot, Credentials } from './utils/createBot'
import getId from './utils/getId'
import { ConfigService } from '../config/config.service'

type DevBot = null | {
  id: string,
  botPromise: Promise<Bot>
}

@Injectable()
export class BotsService {
  constructor(private readonly configService: ConfigService){}

  private readonly bots = new Map<string, Bot>()
  private devBot: DevBot = null

  async createBot(credentials: Credentials){
    const id = getId()
    const bot = await createBot(credentials)
    this.bots.set(id, bot)

    return { id, bot }
  }

  private getCredentialsFromConfig(){
    return {
      login: this.configService.get('LOGIN'),
      password: this.configService.get('PASSWORD')
    }
  }

  async createDevBot(credentials: Credentials = this.getCredentialsFromConfig()){
    if(this.devBot === null){
      const id = getId()
      const botPromise = createBot(credentials)
      this.devBot = { id, botPromise }

      const bot = await botPromise
      this.bots.set(id, bot)
      return { id }
    }

    await this.devBot.botPromise

    return {
      id: this.devBot.id
    }
  }

  exitBot(id: string){
    if(!this.hasBot(id))
      return

    this.bots.get(id).exit()
    this.bots.delete(id)
    
    if(this.devBot !== null && this.devBot.id === id)
      this.devBot = null

    console.log(`Exitted ${id} bot`)
  }
  
  async executeSupervisor(id: string, name: string, payload?: any){
    if(!this.hasBot(id))
      return

    return this.getBot(id).executeSupervisor({ name, payload })
  }

  hasBot(id: string){
    return this.bots.has(id)
  }

  getBot(id: string){
    return this.bots.get(id)
  }

  getBotStatus(id: string){
    if(!this.hasBot(id))
      return {
        alive: false
      }

    const { info: { startedAt } } = this.getBot(id)

    return {
      alive: true,
      aliveFor: ms(+new Date - startedAt, { long: true })
    }
  }

  getDevBotStatus(){
    if(this.devBot === null)
      return {
        alive: false
      }

    return {
      id: this.devBot.id,
      ...this.getBotStatus(this.devBot.id)
    }
  }

  getBotsCount(){
    return this.bots.size
  }
}