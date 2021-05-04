import { chomp, chunksToLinesAsync } from '@rauschma/stringio';
import chalk from 'chalk';
import { createSlave, Slave } from 'fork-with-emitter';
import { resolve } from 'path';

export interface Data {
  name: string;
  payload?: string;
}

export type Bot = {
  slave: Slave;
  exit: () => any;
  executeCommand: (ExecuteCommand) => Promise<any>;
  getCommands: () => Promise<any>;
};

const createBot = async ({
  dataDir,
  env = {},
  cookies = {},
  beforeLoad = (slave: Slave) => {},
}) => {
  const slave = createSlave('app.js', {
    cwd: resolve('../bot/dist/'),
    env: {
      HEADLESS: '1',
      ...env,
      CONTROLLED: '1',
      COOKIES: JSON.stringify(cookies),
      DATA_DIR: dataDir,
    },
  });

  beforeLoad(slave);
  (async () => {
    for await (const line of chunksToLinesAsync(slave.fork.stdout))
      console.log(chalk.yellow(chomp(line)));
  })();
  (async () => {
    for await (const line of chunksToLinesAsync(slave.fork.stderr))
      console.log(chalk.red(chomp(line)));
  })();

  await slave.request('start', null, 120);

  return {
    slave,
    exit() {
      slave.emit('exit');
    },
    async executeCommand(data: Data) {
      return await slave.request('executeCommand', data, 60 * 30);
    },
    async getCommands() {
      return await slave.request('getCommands');
    },
  };
};

export default createBot;
