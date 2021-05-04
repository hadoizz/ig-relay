import { ConfigService } from '../config/config.service';
import { Bot } from './utils/createBot';
export declare class BotsService {
    private readonly configService;
    constructor(configService: ConfigService);
    private readonly botInstances;
    createBot(login: string, password: string): Promise<string>;
    exit(botId: string): void;
    get(botId: string): Bot;
    getInfo(botId: string): {
        botId: string;
        created: any;
    };
    getList(): {
        botId: string;
        created: any;
    }[];
}
