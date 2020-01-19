import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(accountId: string, req: any): Promise<any[]>;
    updateJob(jobId: string, req: any, body: any): Promise<void>;
}
