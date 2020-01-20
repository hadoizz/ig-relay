import { Log } from '../entities/log.entity';
import { Repository } from 'typeorm';
import { Followed } from '../entities/followed.entity';
import { Account } from '../entities/account.entity';
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