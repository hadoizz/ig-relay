import { Job } from './job.entity';
import { User } from './user.entity';
import { Log } from './log.entity';
import { Followed } from './followed.entity';
export declare class Account {
    accountId?: number;
    login: string;
    logged: boolean;
    user: User;
    jobs?: Job[];
    logs?: Log[];
    followed?: Followed[];
}
