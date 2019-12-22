import { JobsService } from './jobs.service';
import { Job } from './job.entity';
export declare class JobsController {
    private readonly service;
    constructor(service: JobsService);
    create(job: Job): Promise<Job>;
}
