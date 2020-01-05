import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron'
import { JobEntity } from './job.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity) private readonly jobsRepository: Repository<JobEntity>,
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>
  ){
    this.init()
  }

  private async init(){
    for(const { jobId, cron, evaluate } of await this.getJobs()){
      new CronJob(cron, () => eval(evaluate), null, true, 'Europe/Warsaw')
      console.log(`#${jobId} job initialized`)
    }
  }

  async getJobs(): Promise<JobEntity[]>{
    return await this.jobsRepository.find()
  }

  async getUserJobs(userId: number): Promise<JobEntity[]>{
    try {
      const user = await this.usersRepository.findOneOrFail({ userId }, { relations: ['jobs'] })
      return user.jobs
    } catch(error) {
      return []
    }
  }

  async createJob(job: JobEntity){
    return await this.jobsRepository.save(job)
  }

  async updateJob(job: JobEntity){
    return await this.jobsRepository.save(job)
  }

  async deleteJob(job: JobEntity){
    return await this.jobsRepository.delete(job)
  }
}