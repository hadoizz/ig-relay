import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common'
import { DevService } from './dev/dev.service'
import { BotsService } from './bots.service'

@Controller('bots')
export class BotsController {
  constructor(
    private readonly botsService: BotsService,
    private readonly devService: DevService
  ){}
  
  @Get()
  index(){
    return {
      bots: this.botsService.getCount()
    }
  }

  @Get('dev')
  getDevBotId(@Query('login') login?: string, @Query('password') password?: string){
    return login && password
      ? this.devService.getBotId({ login, password })
      : this.devService.getBotId()
  }

  @Get(':id')
  getBotInfo(@Param('id') id: string){
    const { info: { startedAt, ...info } } = this.botsService.getBot(id)

    return {
      alive: `${(+new Date - startedAt)/1000} seconds`,
      ...info
    }
  }

  @Get(':id/exit')
  exit(@Param('id') id: string){
    this.botsService.getBot(id).exit()
  }

  @Post(':id/executeSupervisor')
  async executeSupervisor(@Param('id') id: string, @Body('name') name: string, @Body('payload') payload: string){
    const result = await this.botsService.getBot(id).executeSupervisor({ name, payload })
    return { 
      result 
    }
  }

  @Get(':id/getSupervisors')
  async getSupervisors(@Param('id') id: string){
    return await this.botsService.getBot(id).getSupervisors()
  }
}
