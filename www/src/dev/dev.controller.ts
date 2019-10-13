import { Controller, Get, Post, Body } from '@nestjs/common'
import { BotService } from '../bot/bot.service'
import BotCommandDto from '../bot/dto/bot-command.dto'

@Controller('dev')
export class DevController {
  constructor(
    private readonly botService: BotService
  ){}

  @Get()
  status(){
    return this.botService.status()
  }

  @Get('supervisors')
  async getSupervisors(){
    return await this.botService.execute({ type: 'getSupervisors' })
  }

  @Post('start')
  async run(){
    await this.botService.start()
  }

  @Post('exit')
  async exit(){
    await this.botService.exit()
  }

  @Post('execute')
  async execute(@Body() botCommandDto: BotCommandDto){
    return await this.botService.execute(botCommandDto)
  }
}