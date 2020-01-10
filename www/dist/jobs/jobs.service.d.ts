import { Job } from './job.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { BotsService } from '../bots/bots.service';
export declare class JobsService {
    private readonly jobRepository;
    private readonly userRepository;
    private readonly botsService;
    constructor(jobRepository: Repository<Job>, userRepository: Repository<User>, botsService: BotsService);
    private loadedJobs;
    private loadJobs;
    private getAllJobs;
    getJobs(userId: number, accountId: number): Promise<any[]>;
    deleteJob(userId: number, jobId: number): Promise<void>;
}
