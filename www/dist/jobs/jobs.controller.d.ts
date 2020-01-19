import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(accountId: string, req: any): Promise<any[]>;
    createJob(accountId: string, req: any, body: any): Promise<void>;
    updateJob(jobId: string, req: any, body: any): Promise<void>;
    deleteJob(jobId: string, req: any): Promise<void>;
}
