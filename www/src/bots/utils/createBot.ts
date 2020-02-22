import { resolve } from 'path'
import chalk from 'chalk'
import { createSlave, Slave } from 'fork-with-emitter'
import { chunksToLinesAsync, chomp } from '@rauschma/stringio'

export interface ExecuteSupervisorCommand {
  name: string
  payload?: string
}

export type Bot = {
  slave: Slave,
  exit: () => any,
  executeSupervisor: (ExecuteSupervisorCommand) => Promise<any>,
  getSupervisors: () => Promise<any>
}

const createBot = async ({ dataDir, device, env = {}, cookies = {}, beforeLoad = slave => {} }) => {
  const slave = createSlave('app.js', {
    cwd: resolve('../bot/dist/'),
    env: {
      HEADLESS: '1',
      ...env,
      CONTROLLED: '1',
      COOKIES: JSON.stringify(cookies),
      DATA_DIR: dataDir,
      DEVICE: device
    }
  })

  beforeLoad(slave)

  ;(async () => {
    for await (const line of chunksToLinesAsync(slave.fork.stdout))
      console.log(chalk.yellow(chomp(line)))
  })()

  ;(async () => {
    for await (const line of chunksToLinesAsync(slave.fork.stderr))
      console.log(chalk.red(chomp(line)))
  })()

  await slave.request('start', null, 120)

  return {
    slave,
    exit(){
      slave.emit('exit')
    },
    async executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand){
      return await slave.request('executeSupervisor', executeSupervisorCommand, 60*30)
    },
    async getSupervisors(){
      return slave.request('getSupervisors')
    }
  }
}

export default createBot