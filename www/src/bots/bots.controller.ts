import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common'
import { BotsService } from './bots.service'

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService){}

  @Get(':id')
  getBotInfo(@Param('id') id: string){
    return {
      createdAt: this.botsService.getCreatedAt(id)
    }
  } 

  @Get(':id/exit')
  exit(@Param('id') id: string){
    this.botsService.exit(id)
  }

  @Post(':id/executeSupervisor')
  async executeSupervisor(@Param('id') id: string, @Body('name') name: string, @Body('payload') payload: string){
    return { 
      result: await this.botsService.get(id).executeSupervisor({ name, payload })
    }
  }

  @Get(':id/getSupervisors')
  async getSupervisors(@Param('id') id: string){
    try {
      return await this.botsService.get(id).getSupervisors()
    } catch(error){
      return []
    }
  }
}
