import { Bot } from './utils/createBot';
import { ConfigService } from '../config/config.service';
import { LogsService } from '../logs/logs.service';
import { AccountsService } from '../accounts/accounts.service';
export declare class BotsService {
    private readonly configService;
    private readonly logsService;
    private readonly accountsService;
    constructor(configService: ConfigService, logsService: LogsService, accountsService: AccountsService);
    private readonly botInstances;
    createBot({ accountId, device, web }: {
        accountId: number;
        device?: string;
        web?: boolean;
    }): Promise<string>;
    exit(id: string): void;
    get(id: string): Bot;
    getList(): {
        id: string;
        created: any;
        accountId: number;
    }[];
}
