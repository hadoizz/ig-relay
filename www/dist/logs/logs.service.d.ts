import { Log } from '../entities/log.entity';
import { Repository } from 'typeorm';
import { Followed } from '../entities/followed.entity';
import { Account } from '../entities/account.entity';
export declare class LogsService {
    private readonly logRepository;
    private readonly followedRepository;
    private readonly accountRepository;
    constructor(logRepository: Repository<Log>, followedRepository: Repository<Followed>, accountRepository: Repository<Account>);
    handleLog: (accountId: number) => ({ type, payload }: {
        type: string;
        payload: any;
    }) => Promise<void>;
    handleRequestIsFollowed: (accountId: number) => (login: string) => Promise<boolean>;
    handleRequestOldestFollowed: (accountId: number) => () => Promise<any>;
    getLogs(userId: number, accountId: number): Promise<any[]>;
    getFollowedCounts(userId: number, accountId: number): Promise<any[]>;
}
