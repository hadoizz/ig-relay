import { Account } from './account.entity';
export declare class Log {
    logId?: number;
    createdAt?: string;
    type: string;
    payload?: string;
    account?: Account;
}
