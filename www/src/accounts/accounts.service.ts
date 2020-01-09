import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, prop, pipe } from 'ramda'
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
  @InjectRepository(Account) private readonly accountRepository: Repository<Account>){
    this.getAccounts(1)
  }

  async getAccounts(userId: number){
    const accounts = await this.userRepository.find({ relations: ['account'] })
    const accountsId = map(pipe(prop('account'), prop('accountId')), accounts)
    console.log(accountsId)
    return accountsId
  }
}
