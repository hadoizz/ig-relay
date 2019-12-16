import { Injectable } from '@nestjs/common'
import createBot, { Bot, Credentials, ExecuteSupervisorCommand } from './createBot'

const getId = () => 
  Math.random().toString(36).slice(2)+(new Date).getTime().toString(36)

@Injectable()
export class BotsService {
  private readonly bots = new Map<string, Bot>()

  getCount(){
    return this.bots.size
  }

  async createBot(credentials: Credentials){
    const id = getId()
    const bot = await createBot(credentials)
    this.bots.set(id, bot)

    return { id, bot }
  }

  async exitBot(id: string){
    await this.bots.get(id).exit()
    this.bots.delete(id)
  }

  getBot(id: string){
    return this.bots.get(id)
  }
}
