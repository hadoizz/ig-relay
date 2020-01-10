import { Bot, Credentials } from './utils/createBot';
import { ConfigService } from '../config/config.service';
export declare class BotsService {
    private readonly configService;
    constructor(configService: ConfigService);
    private readonly bots;
    private devBot;
    createBot(credentials: Credentials): Promise<{
        id: string;
        bot: {
            info: {
                startedAt: number;
            };
            slave: import("fork-with-emitter").Slave;
            exit(): void;
            executeSupervisor(executeSupervisorCommand: import("./utils/createBot").ExecuteSupervisorCommand): Promise<unknown>;
            getSupervisors(): Promise<unknown>;
        };
    }>;
    private getCredentialsFromConfig;
    createDevBot(credentials?: Credentials): Promise<{
        id: string;
    }>;
    private clearAfterExit;
    private clearBot;
    exitBot(id: string): void;
    executeSupervisor(id: string, name: string, payload?: any): Promise<any>;
    hasBot(id: string): boolean;
    getBot(id: string): Bot;
    getBotStatus(id: string): {
        alive: boolean;
        aliveFor?: undefined;
    } | {
        alive: boolean;
        aliveFor: any;
    };
    getDevBotStatus(): {
        alive: boolean;
    } | {
        alive: boolean;
        aliveFor?: undefined;
        id: string;
    } | {
        alive: boolean;
        aliveFor: any;
        id: string;
    };
    getBotsCount(): number;
}
