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

  //@UseGuards(AuthGuard('jwt'))
  @Get('start/account/:accountId')
  async start(@Request() req, @Param('accountId') accountId: string | number){
    accountId = Number(accountId)

    /*const accounts = await this.accountsService.getAccounts(req.user.userId)
    if(!accounts.some(account => account.accountId === accountId))
      throw `User "${req.user.userId}" doesn't have "${accountId}" account`*/

    const id = await this.botsService.createBot({ accountId })
    return { id }
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
    return { 
      result: await this.botsService.get(botId).executeSupervisor({ name, payload })
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
