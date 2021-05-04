import { BotsService } from './bots.service';
export declare class BotsController {
    private readonly botsService;
    constructor(botsService: BotsService);
    getList(): {
        botId: string;
        created: any;
    }[];
    getInfo(botId: string): {
        botId: string;
        created: any;
    };
    start(login: string, password: string): Promise<{
        message: string;
    }>;
    exit(botId: string): void;
    exit_post(botId: string): void;
    executeCommand(botId: string, name: string, payload: string): Promise<{
        message: any;
    }>;
    getCommands(botId: string): Promise<{
        message: any;
    }>;
}
