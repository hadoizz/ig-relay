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
    @InjectRepository(Job) private readonly jobsRepository: Repository<Job>,
    private readonly botsService: BotsService
  ){
    this.loadJobs()
  }

  private loadedJobs = new Map<number, CronJob>()
  private async loadJobs(){
    const jobs = await this.jobsRepository.find({ relations: ['account'] })
    jobs.forEach(({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds, account: { login, password } }) => {
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

  async getJobs(userId: number, accountId: number): Promise<Job[]>{
    return await this.jobsRepository.find({
      select: ['jobId','cron','supervisor','supervisorPayload','maxDelaySeconds'],
      join: { 
        alias: 'job', 
        innerJoin: { 
          'account': 'job.account',
          'user': 'account.user'
        } 
      },
      where: qb => {
        qb
          .where('account.accountId = :accountId', { accountId })
          .andWhere('user.userId = :userId', { userId })
      },
      order: { createdAt: 'DESC' }
    })
  }

  async deleteJob(jobId: number){
    if(this.loadedJobs.has(jobId))
      this.loadedJobs.get(jobId).stop()

    this.jobsRepository.delete(jobId)
  }
}