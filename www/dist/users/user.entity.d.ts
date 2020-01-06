import { Account } from '../accounts/account.entity';
export declare class User {
    userId?: number;
    username: string;
    password: string;
    account?: Account;
}
