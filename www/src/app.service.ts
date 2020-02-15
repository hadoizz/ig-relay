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

    this.userRepository.save(user)

    console.log('Added dev user')
  }
}