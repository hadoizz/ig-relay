import { Controller, Get, Post, Body, UseGuards, Query, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getJobs(@Query('accountId') accountId: string, @Request() req){
    if(!accountId || !req.user)
      return []

    return await this.jobsService.getJobs(parseInt(req.user.userId), parseInt(accountId))
  }
}
