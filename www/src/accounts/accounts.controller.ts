import { Controller, UseGuards, Param, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getAccounts(@Request() req){
    return this.accountService.getAccounts(req.user.userId)
  }
}
