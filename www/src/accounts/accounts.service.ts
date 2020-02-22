import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Account } from '../entities/account.entity';
import { UsersService } from '../users/users.service';
import { RequiredAccountData } from './profile.interface';
import createDataDir from './utils/createDataDir';
import deleteDataDir from './utils/deleteDataDir';
import { Job } from '../entities/job.entity';
import { Followed } from '../entities/followed.entity';
import { Log } from '../entities/log.entity';
import getRandomDevice from './utils/devices/getRandomDevice';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Followed) private readonly followedRepository: Repository<Followed>,
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
    private readonly usersService: UsersService){}

  async deleteAccount(accountId: number){
    const account = await this.accountRepository.findOne(accountId)
    await this.jobRepository.delete({ account })
    await this.followedRepository.delete({ account })
    await this.logRepository.delete({ account })
    await this.accountRepository.delete({ accountId })
     
    deleteDataDir(accountId)
    console.log(`Deleted ${accountId} account (${account.login})`)
  }

  async getAccount(accountId: number){
    return await this.accountRepository.findOne(accountId)
  }

  /**
   * Returns accounts related to user.
   * @param userId 
   */
  async getAccounts(userId: number){
    const accounts = await this.accountRepository
      .createQueryBuilder('account')
      .select(['login', 'accountId', 'logged', 'device'])
      .where('account.user = :userId', { userId })
      .getRawMany()

    //remove unlogged accounts (used for e.g. unsucceed signing in)
    accounts.filter(({ logged }) => !logged).map(({ accountId }) => this.deleteAccount(accountId))

    return accounts.filter(({ logged }) => logged)
  }

  async hasAccount(userId: number, accountId: number){
    return (await this.accountRepository
      .createQueryBuilder('account')
      .select(['accountId'])
      .where('account.user = :userId', { userId })
      .andWhere('accountId = :accountId', { accountId })
      .getRawOne()) !== undefined
  }

  async setLogged(userId: number, accountId: number, login: string){
    await this.accountRepository
      .createQueryBuilder('account')
      .update(Account)
      .set({ 
        logged: true, 
        login //login may change
      })
      .where('user = :userId', { userId })
      .andWhere('accountId = :accountId', { accountId })
      .execute()
  }

  async createAccount(userId: number, { login }: RequiredAccountData){
    const user = await this.usersService.getUser({ userId })
    if(!user)
      throw `Can't find user`

    if(!login)
      throw `Missing login`

    const insertResult = await this.accountRepository.createQueryBuilder()
      .insert()
      .into(Account)
      .values({
        login,
        user,
        device: getRandomDevice()
      })
      .execute()

    const accountId = insertResult.identifiers[0].accountId
    if(accountId === undefined)
      throw `Can't create account`
    
    await createDataDir(accountId)

    return {
      accountId
    }
  }
}
