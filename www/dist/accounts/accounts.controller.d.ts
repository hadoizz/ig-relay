import { AccountsService } from './accounts.service';
import { RequiredAccountData } from './profile.interface';
export declare class AccountsController {
    private readonly accountService;
    constructor(accountService: AccountsService);
    getAccounts(req: any): Promise<any[]>;
    setLogged(req: any, accountId: string, { login }: {
        login: string;
    }): Promise<void>;
    create(req: any, account: RequiredAccountData): Promise<{
        accountId: any;
    }>;
    deleteAccount(req: any, accountId: string): Promise<boolean>;
}
