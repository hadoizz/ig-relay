import { Job } from '../entities/job.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { BotsService } from '../bots/bots.service';
import { LogsService } from '../logs/logs.service';
import { Account } from '../entities/account.entity';
export declare class JobsService {
    private readonly jobRepository;
    private readonly userRepository;
    private readonly accountRepository;
    private readonly botsService;
    private readonly logsService;
    constructor(jobRepository: Repository<Job>, userRepository: Repository<User>, accountRepository: Repository<Account>, botsService: BotsService, logsService: LogsService);
    private loadedJobs;
    private loadJob;
    private unloadJob;
    private unloadJobs;
    private loadJobs;
    private getAllJobs;
    private hasJob;
    getJobs(userId: number, accountId: number): Promise<any[]>;
    deleteJob(userId: number, jobId: number): Promise<void>;
    updateJob(userId: number, jobId: number, body: any): Promise<void>;
    createJob(userId: number, accountId: number, job: any): Promise<void>;
}
