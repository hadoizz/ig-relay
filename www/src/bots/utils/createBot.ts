import { resolve } from 'path'
import chalk from 'chalk'
import { createSlave, Slave } from 'fork-with-emitter'
import { chunksToLinesAsync, chomp } from '@rauschma/stringio'

export class Credentials {
  login: string
  password: string
}

export interface ExecuteSupervisorCommand {
  name: string
  payload?: string
}

export type Bot = {
  info: { startedAt: number },
  fork: Slave,
  exit: () => any,
  executeSupervisor: (ExecuteSupervisorCommand) => Promise<any>,
  getSupervisors: () => Promise<any>
}

const createBot = async ({ login, password }: Credentials) => {
  const bot = createSlave('app.js', {
    cwd: resolve('../bot/dist/'),
    env: {
      ...process.env,
      CONTROLLED: '1',
      LOGIN: login,
      PASSWORD: password
    }
  })

  ;(async () => {
    for await (const line of chunksToLinesAsync(bot.fork.stdout))
      console.log(chalk.yellow(chomp(line)))
  })()

  ;(async () => {
    for await (const line of chunksToLinesAsync(bot.fork.stderr))
      console.log(chalk.red(chomp(line)))
  })()

  await bot.request('start')

  const startedAt = +new Date

  return {
    info: {
      startedAt
    },
    fork: bot,
    exit(){
      bot.emit('exit')
    },
    async executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand){
      try {
        return await bot.request('executeSupervisor', executeSupervisorCommand, 1000*60*30)
      } catch(error) {
        throw new Error(error)
      }
    },
    async getSupervisors(){
      return bot.request('getSupervisors')
    }
  }
}

export default createBot