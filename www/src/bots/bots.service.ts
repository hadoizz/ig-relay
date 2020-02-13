import { Injectable } from '@nestjs/common'
import createBot, { Bot } from './utils/createBot'
import getId from './utils/getId'
import { ConfigService } from '../config/config.service'
import { Slave } from 'fork-with-emitter'
import path from 'path'
import mkdirp from 'mkdirp'
import ms from 'ms'
import { LogsService } from '../logs/logs.service'

type BotInstance = {
  bot: Bot
  accountId: number
  createdAt: Date
}

@Injectable()
export class BotsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logsService: LogsService
  ){}

  private readonly botInstances = new Map<string, BotInstance>()

  async createBot({ accountId }: { accountId: number }){
    const id = await getId()

    const dataDir = path.resolve(__dirname, `../../../accounts_data/${accountId}`)
    await mkdirp(dataDir)     
    
    const cleanup = () =>
      this.botInstances.delete(id)

    const bot = await createBot({
      dataDir,
      env: {
        LOGIN: this.configService.get('LOGIN'),
        PASSWORD: this.configService.get('PASSWORD'),
        NODE_ENV: this.configService.get('NODE_ENV'),
        ...this.configService.get('HEADLESS') && { HEADLESS: this.configService.get('HEADLESS') }
      },
      beforeLoad: (slave: Slave) => {
        slave.on('log', this.logsService.handleLog(accountId))
        slave.onRequest('isFollowed', this.logsService.handleRequestIsFollowed(accountId))
        slave.onRequest('oldestFollowed', this.logsService.handleRequestOldestFollowed(accountId))
        slave.fork.once('exit', cleanup)
        slave.fork.once('error', cleanup)
      }
    })

    this.botInstances.set(id, { 
      bot, 
      accountId,
      createdAt: new Date
    })

    console.log(`Created ${id} bot`)

    return id
  }

  exit(id: string){
    if(this.botInstances.has(id)){
      this.botInstances.get(id).bot.exit()
      this.botInstances.delete(id)
      console.log(`Exitted ${id} bot`)
    }
  }

  get(id: string){
    if(this.botInstances.has(id))
      return this.botInstances.get(id).bot

    return null
  }

  getList(){
    return [...this.botInstances.entries()].map(([ id, botInstance ]: [ string, BotInstance ]) => ({
      id,
      created: ms(Date.now() - botInstance.createdAt.getTime()),
      accountId: botInstance.accountId
    }))
  }
}
