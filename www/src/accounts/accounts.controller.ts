import { Controller, UseGuards, Param, Get, Request, Post, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';
import { RequiredAccountData } from './profile.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAccounts(@Request() req){
    return this.accountService.getAccounts(req.user.userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:accountId/logged')
  async setLogged(@Request() req, @Param('accountId') accountId: string, @Body() { login }: { login: string }){
    return this.accountService.setLogged(req.user.userId, +accountId, login)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async create(@Request() req, @Body() account: RequiredAccountData){
    return this.accountService.createAccount(req.user.userId, account)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:accountId')
  async deleteAccount(@Request() req, @Param('accountId') accountId: string){
    if(await this.accountService.hasAccount(req.user.userId, +accountId)){
      await this.accountService.deleteAccount(+accountId)
      return true
    }

    return false
  }
}