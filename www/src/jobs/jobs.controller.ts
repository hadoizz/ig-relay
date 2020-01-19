import { Controller, Get, Post, Body, UseGuards, Query, Request, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService){}

  @UseGuards(AuthGuard('jwt'))
  @Get('/account/:accountId')
  async getJobs(@Param('accountId') accountId: string, @Request() req){
    return await this.jobsService.getJobs(parseInt(req.user.userId), parseInt(accountId))
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:jobId/update')
  async updateJob(@Param('jobId') jobId: string, @Request() req, @Body() body){
    return await this.jobsService.updateJob(parseInt(req.user.userId), parseInt(jobId), body)
  }
}
