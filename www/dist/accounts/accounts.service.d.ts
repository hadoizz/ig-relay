import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
export declare class AccountsService {
    private readonly accountRepository;
    constructor(accountRepository: Repository<Account>);
    getAccounts(userId: number): Promise<any[]>;
    getCredentials(userId: number, accountId: number): Promise<any[]>;
}
