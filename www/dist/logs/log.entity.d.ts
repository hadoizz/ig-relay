import { Account } from '../accounts/account.entity';
export declare class Log {
    logId?: number;
    createdAt?: string;
    type: string;
    payload?: string;
    account?: Account;
}
