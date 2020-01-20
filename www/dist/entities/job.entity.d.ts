import { Account } from './account.entity';
export declare class Job {
    jobId: number;
    cron: string;
    supervisor: string;
    supervisorPayload?: string;
    maxDelaySeconds?: number;
    createdAt?: string;
    account: Account;
}
