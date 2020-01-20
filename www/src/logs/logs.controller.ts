import { Controller, Get, UseGuards, Param, Request } from '@nestjs/common';
import { LogsService } from './logs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/account/:accountId')
  async getJobs(@Param('accountId') accountId: string, @Request() req){
    return await this.logsService.getLogs(parseInt(req.user.userId), parseInt(accountId))
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/account/:accountId/followedCounts')
  async getFollowedCounts(@Param('accountId') accountId: string, @Request() req){
    return await this.logsService.getFollowedCounts(parseInt(req.user.userId), parseInt(accountId))
  }
}