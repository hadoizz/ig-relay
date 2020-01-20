import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Job } from './entities/job.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>
  ){
    this.init()
  }

  async init(){
    if((await this.userRepository.findOne({ username: 'admin' })) !== undefined)
      return

    const user = this.userRepository.create({ username: 'admin', password: 'kolorowemaslojestnajlepsze' })

    const account = this.accountRepository.create({ login: 'jaca7_', password: 'Panasonic7', user })
    user.accounts = [account] 

    const job = this.jobRepository.create({ cron: '0 * * * * *', supervisor: 'identity', supervisorPayload: 'xD', account })
    account.jobs = [job]

    this.jobRepository.save(job)

    console.log('Added dev user')
  }
}