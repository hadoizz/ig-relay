import { Bot } from './utils/createBot';
import { ConfigService } from '../config/config.service';
import { LogsService } from '../logs/logs.service';
export declare class BotsService {
    private readonly configService;
    private readonly logsService;
    constructor(configService: ConfigService, logsService: LogsService);
    private readonly botInstances;
    createBot({ accountId }: {
        accountId: number;
    }): Promise<string>;
    exit(id: string): void;
    get(id: string): Bot;
    getCreatedAt(id: string): Date;
}
