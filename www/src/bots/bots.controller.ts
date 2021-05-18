import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import chalk from 'chalk';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Get('/')
  getList() {
    return this.botsService.getList();
  }

  @Get(':botId')
  getInfo(@Param('botId') botId: string) {
    return this.botsService.getInfo(botId);
  }

  @Post('start')
  async start(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const botId = await this.botsService.createBot(login, password);
    return {
      message: botId,
    };
  }

  @Get(':botId/exit')
  exit(@Param('botId') botId: string) {
    this.botsService.exit(botId);
  }

  @Post(':botId/exit')
  exit_post(@Param('botId') botId: string) {
    this.botsService.exit(botId);
  }

  @Post(':botId/command')
  async executeCommand(
    @Param('botId') botId: string,
    @Body('name') name: string,
    @Body('payload') payload: string,
  ) {
    //parse payload if can be parsed
    try {
      payload = JSON.parse(payload);
    } catch (error) {}

    try {
      return {
        message: await this.botsService
          .get(botId)
          .executeCommand({ name, payload }),
      };
    } catch (error) {
      console.log(`Phone's error:`, chalk.red(error));
      throw `Phone's error: "${
        typeof error === 'string' ? error : error.message
      }"`;
    }
  }

  @Get(':botId/commands')
  async getCommands(@Param('botId') botId: string) {
    try {
      return {
        message: await this.botsService.get(botId).getCommands(),
      };
    } catch (error) {
      return {
        message: [],
      };
    }
  }
}
