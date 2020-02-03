import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';
import { Repository } from 'typeorm';
import { Followed } from '../entities/followed.entity';
import { Account } from '../entities/account.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
    @InjectRepository(Followed) private readonly followedRepository: Repository<Followed>,
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>
  ){}

  handleLog = (accountId: number) => async ({ type, payload }: { type: string, payload: any }) => {
    const account = await this.accountRepository.findOne(accountId)

    if(type === 'followed'){
      this.followedRepository.insert({ login: payload, account })
      return
    } else if(type ==='unfollowed'){
      this.followedRepository.update({ login: payload, account }, { unfollowed: true })
      return
    }

    this.logRepository.insert({ type, payload, account })
  }

  handleRequestIsFollowed = (accountId: number) => async (login: string) => {
    const row = await this.followedRepository
      .createQueryBuilder('followed')
      .innerJoin('followed.account', 'account')
      .andWhere('followed.login = :login', { login })
      .andWhere('account.accountId = :accountId', { accountId })
      .getRawOne()

    if(row === undefined)
      return false

    return true
  }

  handleRequestOldestFollowed = (accountId: number) => async () => {
    const row = await this.followedRepository
      .createQueryBuilder('followed')
      .select('followed.login as login')
      .innerJoin('followed.account', 'account')
      .where('followed.unfollowed != 1')
      .andWhere('account.accountId = :accountId', { accountId })
      .orderBy('followed.createdAt', 'ASC')
      .getRawOne()
    
    if(row === undefined)
      return null

    return row.login
  }

  async getLogs(userId: number, accountId: number){
    return await this.logRepository
      .createQueryBuilder('log')
      .select(['type', 'payload', 'log.createdAt as createdAt'])
      .innerJoin('log.account', 'account')
      .innerJoin('account.user', 'user')
      .where('account.accountId = :accountId', { accountId })
      .andWhere('user.userId = :userId', { userId })
      .orderBy('log.createdAt', 'DESC')
      .take(200)
      .getRawMany()
  }

  async getFollowedCounts(userId: number, accountId: number){
    return await this.followedRepository
      .createQueryBuilder('followed')
      .select(['COUNT(followed.followedId) as count', 'unfollowed'])
      .innerJoin('followed.account', 'account')
      .innerJoin('account.user', 'user')
      .where('account.accountId = :accountId', { accountId })
      .andWhere('user.userId = :userId', { userId })
      .groupBy('unfollowed')
      .getRawMany()
  }
}
