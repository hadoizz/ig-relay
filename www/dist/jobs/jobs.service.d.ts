import { Job } from './job.entity';
import { Repository } from 'typeorm';
import { BotsService } from '../bots/bots.service';
export declare class JobsService {
    private readonly jobsRepository;
    private readonly botsService;
    constructor(jobsRepository: Repository<Job>, botsService: BotsService);
    private loadedJobs;
    private loadJobs;
    getJobs(userId: number, accountId: number): Promise<Job[]>;
    deleteJob(jobId: number): Promise<void>;
}
