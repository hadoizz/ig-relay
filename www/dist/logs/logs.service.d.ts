import { Log } from './log.entity';
import { Repository } from 'typeorm';
import { Followed } from './followed.entity';
import { Account } from '../accounts/account.entity';
import { Slave } from 'fork-with-emitter';
export declare class LogsService {
    private readonly logRepository;
    private readonly followedRepository;
    private readonly accountRepository;
    constructor(logRepository: Repository<Log>, followedRepository: Repository<Followed>, accountRepository: Repository<Account>);
    attachLogsListenersToSlave(slave: Slave, accountId: number): void;
    getLogs(userId: number, accountId: number): Promise<any[]>;
    getFollowedCounts(userId: number, accountId: number): Promise<any[]>;
}
