import { Job } from './job.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
export declare class JobsService {
    private readonly jobsRepository;
    private readonly usersRepository;
    constructor(jobsRepository: Repository<Job>, usersRepository: Repository<User>);
    getJobs(userId: number, accountId: number): Promise<Job[]>;
    createJob(job: Job): Promise<Job>;
    updateJob(job: Job): Promise<Job>;
    deleteJob(job: Job): Promise<import("typeorm").DeleteResult>;
}
