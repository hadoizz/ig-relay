import { Account } from './account.entity';
export declare class User {
    userId?: number;
    username: string;
    password: string;
    accounts?: Account[];
}