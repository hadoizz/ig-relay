import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountService;
    constructor(accountService: AccountsService);
    getAccounts(req: any): Promise<any[]>;
}
