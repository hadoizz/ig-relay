import { Injectable, Scope } from '@nestjs/common'
import execa from 'execa'
import { resolve } from 'path'
import chalk from 'chalk'
import sleep from 'sleep-promise'
import { BotStatus } from './bot.interface'
import BotCommandDto from './dto/bot-command.dto'
import { EventEmitter } from 'events'

@Injectable({ scope: Scope.TRANSIENT })
export class BotService {  
  private botInstance?: execa.ExecaChildProcess = null
  private emitter = new EventEmitter

  status(): BotStatus {
    return {
      running: this.botInstance !== null
    }
  }

  async start(){
    if(this.status().running)
      return
    
    this.botInstance = execa.node(
      resolve('../bot'),
      ['dist/app'],
      //@ts-ignore
      { cwd: resolve('../bot') } 
    )
    this.botInstance.on('exit', this.handleExit)
    this.botInstance.on('message', this.handleMessage)
    this.botInstance.stdout.on('data', this.handleLog)
    this.botInstance.stdout.on('end', this.handleLog)

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
    this.handleExit()
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

  private handleMessage = ({ type, payload }: BotCommandDto) => {
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

  private handleLog = (log?: string) => {
    if(log === undefined)
      return
  
    console.log(
      'Bot:', 
      chalk.cyan(Buffer.from(log, 'utf-8').toString().trim())
    )
  }
}