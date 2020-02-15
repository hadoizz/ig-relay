import { Controller, UseGuards, Param, Get, Request, Post, Body } from '@nestjs/common';
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
  async setLogged(@Request() req, @Param('accountId') accountId: string){
    return this.accountService.setLogged(req.user.userId, +accountId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async create(@Request() req, @Body() account: RequiredAccountData){
    return this.accountService.createAccount(req.user.userId, account)
  }
}