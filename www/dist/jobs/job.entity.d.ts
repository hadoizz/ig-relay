import { Account } from '../accounts/account.entity';
export declare class Job {
    jobId: number;
    cron: string;
    supervisor: string;
    supervisorPayload?: string;
    maxDelaySeconds?: number;
    createdAt?: number;
    updateDateCreation(): void;
    account: Account;
}
