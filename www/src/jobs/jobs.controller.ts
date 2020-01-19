import { Controller, Get, Post, Body, UseGuards, Query, Request, Param, Put, Patch, Delete } from '@nestjs/common';
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
  @Post('/account/:accountId')
  async createJob(@Param('accountId') accountId: string, @Request() req, @Body() body){
    return await this.jobsService.createJob(parseInt(req.user.userId), parseInt(accountId), body)
  } 

  @UseGuards(AuthGuard('jwt'))
  @Put('/:jobId')
  async updateJob(@Param('jobId') jobId: string, @Request() req, @Body() body){
    return await this.jobsService.updateJob(parseInt(req.user.userId), parseInt(jobId), body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:jobId')
  async deleteJob(@Param('jobId') jobId: string, @Request() req){
    return await this.jobsService.deleteJob(parseInt(req.user.userId), parseInt(jobId))
  }
}
