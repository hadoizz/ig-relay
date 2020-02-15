import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { UsersService } from '../users/users.service';
import { RequiredAccountData } from './profile.interface';
import { Job } from '../entities/job.entity';
import { Followed } from '../entities/followed.entity';
import { Log } from '../entities/log.entity';
export declare class AccountsService {
    private readonly accountRepository;
    private readonly jobRepository;
    private readonly followedRepository;
    private readonly logRepository;
    private readonly usersService;
    constructor(accountRepository: Repository<Account>, jobRepository: Repository<Job>, followedRepository: Repository<Followed>, logRepository: Repository<Log>, usersService: UsersService);
    deleteAccount(accountId: number): Promise<void>;
    getAccounts(userId: number): Promise<any[]>;
    hasAccount(userId: number, accountId: number): Promise<boolean>;
    setLogged(userId: number, accountId: number): Promise<void>;
    createAccount(userId: number, { login }: RequiredAccountData): Promise<{
        accountId: any;
    }>;
}
