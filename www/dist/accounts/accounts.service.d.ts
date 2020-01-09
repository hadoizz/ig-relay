import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
export declare class AccountsService {
    private readonly userRepository;
    private readonly accountRepository;
    constructor(userRepository: Repository<User>, accountRepository: Repository<Account>);
    getAccounts(userId: number): Promise<any>;
}
