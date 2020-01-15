import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';
import { Log } from '../logs/log.entity';
import { Followed } from '../logs/followed.entity';
export declare class Account {
    accountId?: number;
    login: string;
    password: string;
    user: User;
    jobs?: Job[];
    logs?: Log[];
    followed?: Followed[];
}
