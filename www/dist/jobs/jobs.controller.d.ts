import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(accountId: string, req: any): Promise<import("./job.entity").Job[]>;
}
