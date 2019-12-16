import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly service: JobsService){}

  @Post()
  create(@Body() job: Job){
    return this.service.createJob(job)
  }
}
