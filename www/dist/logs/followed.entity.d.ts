import { Account } from '../accounts/account.entity';
export declare class Followed {
    followedId?: number;
    login: string;
    unfollowed: boolean;
    account: Account;
    createdAt?: string;
}
