import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron'
import { Job } from './job.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import delay from 'delay'
import random from 'random-int'
import { BotsService } from '../bots/bots.service';

const createJob = (cron: string, fn: () => Promise<void>) =>
  new CronJob(cron, fn, null, true, 'Europe/Warsaw')

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly botsService: BotsService
  ){
    this.loadJobs()
  }

  private loadedJobs = new Map<number, CronJob>()
  private async loadJobs(){
    (await this.getAllJobs()).forEach(({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds, login, password }) => {
      const job = createJob(cron, async () => {
        console.log(`Starting job ${jobId}`)
        await delay(random(0, maxDelaySeconds*1000))
        
        //Job may became deleted after delay
        if(!this.loadedJobs.has(jobId))
          return

        const { id } = await this.botsService.createBot({ login, password })
        const result = await this.botsService.executeSupervisor(id, supervisor, supervisorPayload)
        await this.botsService.exitBot(id)

        if(result){
          console.log(`Ended job ${jobId} with result ${result}`)
          return
        }

        console.log(`Ended job ${jobId}`)
      })

      this.loadedJobs.set(jobId, job)
      console.log(`Loaded job ${jobId}`)
    })
  }

  /**
   * Returns all jobs. 
   */
  private async getAllJobs(){
    const jobs = await this.jobRepository
      .createQueryBuilder('job')
      .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds', 'account.login as login', 'account.password as password'])
      .innerJoin('job.account', 'account')
      .orderBy('createdAt', 'DESC')
      .getRawMany()

    return jobs
  }

  /**
   * Returns jobs related to user and account.
   * @param userId 
   * @param accountId 
   */
  async getJobs(userId: number, accountId: number){
    const jobs = await this.userRepository
      .createQueryBuilder('user')
      .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds'])
      .innerJoin('user.accounts', 'account')
      .innerJoin('account.jobs', 'job')
      .where('user.userId = :userId', { userId })
      .andWhere('account.accountId = :accountId', { accountId })
      .orderBy('job.createdAt', 'DESC')
      .getRawMany()
    
    console.log(jobs)
    return jobs
  }

  async deleteJob(jobId: number){
    if(this.loadedJobs.has(jobId))
      this.loadedJobs.get(jobId).stop()

    this.jobRepository.delete(jobId)
  }
}