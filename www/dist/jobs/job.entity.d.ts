import { User } from '../users/user.entity';
export declare class Job {
    jobId: number;
    cron: string;
    evaluate: string;
    belongsTo: User;
}
