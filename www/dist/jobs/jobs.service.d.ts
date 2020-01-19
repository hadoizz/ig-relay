import { Job } from './job.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { BotsService } from '../bots/bots.service';
import { LogsService } from '../logs/logs.service';
export declare class JobsService {
    private readonly jobRepository;
    private readonly userRepository;
    private readonly botsService;
    private readonly logsService;
    constructor(jobRepository: Repository<Job>, userRepository: Repository<User>, botsService: BotsService, logsService: LogsService);
    private loadedJobs;
    private loadJob;
    private unloadJob;
    private loadJobs;
    private getAllJobs;
    private hasJob;
    getJobs(userId: number, accountId: number): Promise<any[]>;
    deleteJob(userId: number, jobId: number): Promise<void>;
    updateJob(userId: number, jobId: number, body: any): Promise<void>;
}
