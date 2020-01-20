import { Injectable } from '@nestjs/common';
import { CronJob, job } from 'cron'
import { Job } from '../entities/job.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import delay from 'delay'
import random from 'random-int'
import { BotsService } from '../bots/bots.service';
import { LogsService } from '../logs/logs.service';
import { Account } from '../entities/account.entity';

const createJob = (cron: string, fn: () => Promise<void>) =>
  new CronJob(cron, fn, null, true, 'Europe/Warsaw')

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    private readonly botsService: BotsService,
    private readonly logsService: LogsService
  ){
    if(process.env.NODE_ENV === 'production')
      this.loadJobs()
  }

  private loadedJobs = new Map<number, CronJob>()

  private async loadJob({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds, accountId, login, password }){
    const job = createJob(cron, async () => {
      console.log(`Starting job ${jobId}`)
      await delay(random(0, maxDelaySeconds*1000))
      
      //Job may became deleted after delay
      if(!this.loadedJobs.has(jobId))
        return

      const { id } = await this.botsService.createBot({ login, password },
        slave => this.logsService.attachLogsListenersToSlave(slave, accountId)  
      )
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
  }

  private unloadJob(jobId: number){
    if(this.loadedJobs.has(jobId))
      this.loadedJobs.get(jobId).stop()
  }

  private unloadJobs(){
    this.loadedJobs.forEach(job => job.stop())
    this.loadedJobs.clear()
  }

  private async loadJobs(){
    const jobs = await this.getAllJobs()
    for(const job of jobs)
      await this.loadJob(job)
  }

  /**
   * Returns all jobs. 
   */
  private async getAllJobs(){
    const jobs = await this.jobRepository
      .createQueryBuilder('job')
      .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds', 'accountId', 'account.login as login', 'account.password as password'])
      .innerJoin('job.account', 'account')
      .orderBy('createdAt', 'DESC')
      .getRawMany()

    return jobs
  }

  private async hasJob(userId: number, jobId: number){
    return Boolean(await this.userRepository
      .createQueryBuilder('user')
      .select(['jobId'])
      .innerJoin('user.accounts', 'account')
      .innerJoin('account.jobs', 'job')
      .where('user.userId = :userId', { userId })
      .andWhere('job.jobId = :jobId', { jobId })
      .getRawOne()
    )
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
    
    return jobs
  }

  /**
   * Deletes job by jobId related to user.
   * @param userId 
   * @param jobId 
   */
  async deleteJob(userId: number, jobId: number){
    if(!(await this.hasJob(userId, jobId)))
      return

    this.unloadJob(jobId)
    this.jobRepository.delete(jobId)
  }

  async updateJob(userId: number, jobId: number, body: any){
    if(!(await this.hasJob(userId, jobId)))
      return

    await this.jobRepository
      .createQueryBuilder('job')
      .update('job')
      .set(body)
      .where('job.jobId = :jobId', { jobId })
      .execute()

    if(process.env.NODE_ENV === 'production'){
      this.unloadJobs()
      await this.loadJobs()
    }
  }

  async createJob(userId: number, accountId: number, job){
    const account = await this.accountRepository
      .createQueryBuilder('account')
      .where('account.user = :userId', { userId })
      .andWhere('account.accountId = :accountId', { accountId })
      .getOne()

    this.jobRepository.insert({
      ...job,
      account
    })
  }
}