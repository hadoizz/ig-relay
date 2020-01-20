import { LogsService } from './logs.service';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    getJobs(accountId: string, req: any): Promise<any[]>;
    getFollowedCounts(accountId: string, req: any): Promise<any[]>;
}
