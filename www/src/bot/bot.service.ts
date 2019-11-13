import { Injectable, Scope } from '@nestjs/common'
import { resolve } from 'path'
import chalk from 'chalk'
import sleep from 'sleep-promise'
import { EventEmitter } from 'events'
import { debounce } from 'throttle-debounce'
import { fork, ChildProcess } from 'child_process'
import { BotStatus, Credentials } from './bot.interface'
import BotCommandDto from './dto/bot-command.dto'

const bufferToString = (buffer: string) =>
  Buffer.from(buffer, 'utf-8').toString()

@Injectable({ scope: Scope.TRANSIENT })
export class BotService {  
  private botInstance?: ChildProcess = null
  private emitter = new EventEmitter

  status(): BotStatus {
    return {
      running: this.botInstance !== null
    }
  }

  async start(credentials?: Credentials){
    if(this.status().running)
      return

    console.log(`Starting with credentials`, credentials)
    
    this.botInstance = fork('app.js', [], {
      cwd: resolve('../bot/dist/'),
      env: { 
        ...process.env, 
        ...credentials && {
          LOGIN: credentials.login,
          PASSWORD: credentials.password
        }
      },
      stdio: [undefined, undefined, undefined, 'ipc']
    })

    this.botInstance.on('exit', this.handleExit)
    this.botInstance.on('message', this.handleProcessMessage)
    this.attachStdoutHandler(this.botInstance)
    this.attachStderrHandler(this.botInstance)

    await new Promise(async (resolve, reject) => {
      this.emitter.once('started', resolve)
      await sleep(10000)
      this.emitter.off('started', resolve)
      reject()
    })
  }

  async exit(){
    if(!this.status().running)
      return

    await this.execute({ type: 'exit' })
  }

  async execute(command: BotCommandDto){
    if(!this.status().running)
      return

    const gettingResult = new Promise(async (resolve, reject) => {
      this.emitter.once('executed', resolve)
      await sleep(5000)
      this.emitter.off('executed', resolve)
      reject()
    })
    this.botInstance.send(command)
    return await gettingResult
  }

  private handleLog = (text: string) => {
    console.log(chalk.yellow(text))
  }

  private handleError = (text: string) => {
    console.log(chalk.red(text))
  }

  private handleProcessMessage = ({ type, payload }: BotCommandDto) => {
    if(type === 'started'){
      this.emitter.emit('started')
      return
    }
    
    if(type === 'executed'){
      this.emitter.emit('executed', payload)
      return
    }
  }

  private handleExit = () => {
    this.botInstance = null
    console.log(`Bot was closed`)
  }

  private attachStdoutHandler = (instance: ChildProcess) => {    
    const end = debounce(100, () => {
      if(text === '')
        return

      this.handleLog(text.trim())
      text = ''
    })

    let text = ''
    instance.stdout.on('data', (data: string) => {
      console.log('stdout')
      text += bufferToString(data)
      end()
    })
    instance.stdout.on('end', end)
  }

  private attachStderrHandler = (instance: ChildProcess) => {
    const end = debounce(100, () => {
      if(text === '')
        return

      this.handleError(text.trim())
      text = ''
    })

    let text = ''
    instance.stderr.on('data', (data: string) => {
      text += bufferToString(data)
      end()
    })
    instance.stderr.on('end', end)
  }
}