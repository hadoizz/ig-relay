import { Injectable } from '@nestjs/common';
import { BotsService } from '../bots/bots.service';

interface Stream {
  previousData: string;
  clientsCount: number;
}

@Injectable()
export class StreamingService {
  constructor(private readonly botsService: BotsService) {}

  private streams: { [botId: string]: Stream } = Object.create(null);

  handleStreaming(botId: string, handleData: (data: string) => void) {
    const bot = this.botsService.get(botId);
    if (!bot) return () => {};

    if (botId in this.streams) {
      this.streams[botId].clientsCount++;
      handleData(this.streams[botId].previousData);
    } else {
      bot.fork.emit('startStreaming');
      this.streams[botId] = {
        previousData: '',
        clientsCount: 1,
      };
    }

    const handler = (data: string) => {
      if (this.streams[botId].previousData.length === data.length) return;

      this.streams[botId].previousData = data;
      handleData(data);
    };

    bot.fork.on('streaming', handler);

    return () => {
      this.streams[botId].clientsCount--;
      if (this.streams[botId].clientsCount === 0) {
        delete this.streams[botId];
        bot.fork.emit('stopStreaming');
      }

      bot.fork.removeListener('streaming', handler);
    };
  }
}
