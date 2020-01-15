import { User } from './users/user.entity';
import { Repository } from 'typeorm';
import { Account } from './accounts/account.entity';
import { Job } from './jobs/job.entity';
export declare class AppService {
    private readonly userRepository;
    private readonly accountRepository;
    private readonly jobRepository;
    constructor(userRepository: Repository<User>, accountRepository: Repository<Account>, jobRepository: Repository<Job>);
    init(): Promise<void>;
}
