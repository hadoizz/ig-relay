import { Controller, Get, Param, Post, Query, Body, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { BotsService } from './bots.service'
import { AccountsService } from '../accounts/accounts.service'

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService,
    private readonly accountsService: AccountsService){}

  @Get('/')
  getList(){
    return this.botsService.getList()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('start/account/:accountId')
  async start(@Request() req, @Param('accountId') accountId: string | number){
    accountId = Number(accountId)

    console.log(`start bot, user ${req.user.userId}, account ${accountId}`)

    if(await this.accountsService.hasAccount(req.user.userId, accountId)){
      const id = await this.botsService.createBot({ accountId, web: true })
      return { id }
    }

    throw `User ${req.user.userId} has no ${accountId} account`
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':botId/exit')
  exit(@Param('botId') botId: string){
    this.botsService.exit(botId)
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post(':botId/exit')
  exit_post(@Param('botId') botId: string){
    this.botsService.exit(botId)
  }
  

  //@UseGuards(AuthGuard('jwt'))
  @Post(':botId/executeSupervisor')
  async executeSupervisor(@Param('botId') botId: string, @Body('name') name: string, @Body('payload') payload: string){
    try {
      const parsed = JSON.parse(payload)
      return { 
        result: await this.botsService.get(botId).executeSupervisor({ name, payload: parsed })
      }
    } catch(error) {
      return { 
        result: await this.botsService.get(botId).executeSupervisor({ name, payload })
      }
    }
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':botId/supervisors')
  async getSupervisors(@Param('botId') botId: string){
    try {
      return await this.botsService.get(botId).getSupervisors()
    } catch(error){
      return []
    }
  }
}
