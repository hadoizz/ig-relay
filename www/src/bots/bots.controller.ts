import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common'
import { BotsService } from './bots.service'

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService){}
  
  @Get()
  index(){
    return {
      botsCount: this.botsService.getBotsCount()
    }
  }

  @Get('dev')
  devBot(){
    return this.botsService.getDevBotStatus()
  }

  @Get('dev/start')
  createDevBot(@Query('login') login?: string, @Query('password') password?: string){
    const credentials = login && password
      ? { login, password }
      : undefined

    return this.botsService.createDevBot(credentials)
  }

  @Get(':id')
  getBotStatus(@Param('id') id: string){
    return this.botsService.getBotStatus(id)
  } 

  @Get(':id/exit')
  exit(@Param('id') id: string){
    this.botsService.exitBot(id)
  }

  @Post(':id/executeSupervisor')
  async executeSupervisor(@Param('id') id: string, @Body('name') name: string, @Body('payload') payload: string){
    return { 
      result: await this.botsService.executeSupervisor(id, name, payload)
    }
  }

  @Get(':id/getSupervisors')
  async getSupervisors(@Param('id') id: string){
    try {
      return await this.botsService.getBot(id).getSupervisors()
    } catch(error){
      return []
    }
  }
}
