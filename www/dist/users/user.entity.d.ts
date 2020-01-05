import { Job } from '../jobs/job.entity';
export declare class User {
    userId?: number;
    username: string;
    password: string;
    jobs?: Job[];
}
