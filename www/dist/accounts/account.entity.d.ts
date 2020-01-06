import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';
export declare class Account {
    accountId?: number;
    login: string;
    password: string;
    user: User;
    jobs?: Job[];
}
