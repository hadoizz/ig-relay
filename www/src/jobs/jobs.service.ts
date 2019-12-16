import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron'
import { Job } from './job.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobsRepository: Repository<Job>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ){
    this.init()
  }

  private async init(){
    for(const { jobId, cron, evaluate } of await this.getJobs()){
      new CronJob(cron, () => eval(evaluate), null, true, 'Europe/Warsaw')
      console.log(`#${jobId} job initialized`)
    }
  }

  async getJobs(): Promise<Job[]>{
    return await this.jobsRepository.find()
  }

  async getUserJobs(userId: number): Promise<Job[]>{
    try {
      const user = await this.usersRepository.findOneOrFail({ userId }, { relations: ['jobs'] })
      return user.jobs
    } catch(error) {
      return []
    }
  }

  async createJob(job: Job){
    return await this.jobsRepository.save(job)
  }

  async updateJob(job: Job){
    return await this.jobsRepository.save(job)
  }

  async deleteJob(job: Job){
    return await this.jobsRepository.delete(job)
  }
}