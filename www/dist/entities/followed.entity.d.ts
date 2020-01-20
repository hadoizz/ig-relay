import { Account } from './account.entity';
export declare class Followed {
    followedId?: number;
    login: string;
    unfollowed: boolean;
    account: Account;
    createdAt?: string;
}
