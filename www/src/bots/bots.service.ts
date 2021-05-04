import { Injectable } from '@nestjs/common';
import { Slave } from 'fork-with-emitter';
import ms from 'ms';
import { ConfigService } from '../config/config.service';
import createBot, { Bot } from './utils/createBot';
import createDataDir from './utils/createDataDir';
import getId from './utils/getId';
import removeDataDir from './utils/removeDataDir';
import removeDataDirs from './utils/removeDataDirs';

type BotInstance = {
  bot: Bot;
  createdAt: Date;
};

@Injectable()
export class BotsService {
  constructor(private readonly configService: ConfigService) {
    removeDataDirs();
  }

  private readonly botInstances = new Map<string, BotInstance>();

  async createBot(login: string, password: string) {
    const botId = await getId();

    const cleanup = () => this.exit(botId);

    const bot = await createBot({
      dataDir: await createDataDir(botId),
      env: {
        LOGIN: login,
        PASSWORD: password,
        NODE_ENV: this.configService.get('NODE_ENV'),
        ...(this.configService.get('HEADLESS') && {
          HEADLESS: this.configService.get('HEADLESS'),
        }),
      },
      beforeLoad: (slave: Slave) => {
        slave.fork.once('exit', cleanup);
        slave.fork.once('error', cleanup);
      },
    });

    this.botInstances.set(botId, {
      bot,
      createdAt: new Date(),
    });

    //maximum 30 minutes lifetime
    setTimeout(cleanup, 1000 * 60 * 30);

    console.log(`Created ${botId} bot`);

    return botId;
  }

  exit(botId: string) {
    if (this.botInstances.has(botId)) {
      this.botInstances.get(botId).bot.exit();
      this.botInstances.delete(botId);
      setTimeout(() => {
        try {
          removeDataDir(botId);
        } catch (error) {
          console.error(`Couldn't remove ${botId} bot's dataDir`, error);
        }
      }, 5000);
      console.log(`Exitted ${botId} bot`);
    }
  }

  get(botId: string) {
    if (this.botInstances.has(botId)) return this.botInstances.get(botId).bot;

    return null;
  }

  getInfo(botId: string) {
    if (!this.botInstances.has(botId)) throw `Bot with this ID has expired.`;
    const botInstance = this.botInstances.get(botId);

    return {
      botId,
      created: ms(Date.now() - botInstance.createdAt.getTime()),
    };
  }

  getList() {
    return [...this.botInstances.keys()].map(botId => this.getInfo(botId));
  }
}
