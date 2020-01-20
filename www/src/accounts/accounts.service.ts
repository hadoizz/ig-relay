import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>){}

  /**
   * Returns accounts related to user.
   * @param userId 
   */
  async getAccounts(userId: number){
    const accounts = await this.accountRepository
      .createQueryBuilder('account')
      .select(['login', 'accountId'])
      .innerJoin('account.user', 'user')
      .where('user.userId = :userId', { userId })
      .getRawMany()

    return accounts
  }

  /**
   * Get credentials related to account and user,
   * @param userId 
   * @param accountId 
   */
  async getCredentials(userId: number, accountId: number){
    const credentials = await this.accountRepository
      .createQueryBuilder('account')
      .select(['account.login as login', 'account.password as password'])
      .innerJoin('account.user', 'user')
      .where('account.accountId = :accountId', { accountId })
      .andWhere('user.userId = :userId', { userId })
      .getRawMany()

    return credentials
  }
}
