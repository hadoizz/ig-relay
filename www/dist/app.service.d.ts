import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Job } from './entities/job.entity';
export declare class AppService {
    private readonly userRepository;
    private readonly accountRepository;
    private readonly jobRepository;
    constructor(userRepository: Repository<User>, accountRepository: Repository<Account>, jobRepository: Repository<Job>);
    init(): Promise<void>;
}
