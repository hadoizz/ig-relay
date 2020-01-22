import { Bot } from './utils/createBot';
import { ConfigService } from '../config/config.service';
import { Slave } from 'fork-with-emitter';
export declare class BotsService {
    private readonly configService;
    constructor(configService: ConfigService);
    private readonly bots;
    createBot(cookies: Object, beforeLoad?: (Slave: any) => any): Promise<{
        id: string;
        bot: {
            info: {
                startedAt: number;
            };
            slave: Slave;
            exit(): void;
            executeSupervisor(executeSupervisorCommand: import("./utils/createBot").ExecuteSupervisorCommand): Promise<unknown>;
            getSupervisors(): Promise<unknown>;
        };
    }>;
    private clearAfterExit;
    private clearBot;
    exitBot(id: string): void;
    executeSupervisor(id: string, name: string, payload?: any): Promise<any>;
    hasBot(id: string): boolean;
    getBot(id: string): Bot;
}
