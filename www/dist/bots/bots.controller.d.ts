import { BotsService } from './bots.service';
export declare class BotsController {
    private readonly botsService;
    constructor(botsService: BotsService);
    index(): {
        botsCount: number;
    };
    devBot(): {
        alive: boolean;
    } | {
        alive: boolean;
        aliveFor?: undefined;
        id: string;
    };
    createDevBot(login?: string, password?: string): Promise<{
        id: string;
    }>;
    getBotStatus(id: string): {
        alive: boolean;
        aliveFor?: undefined;
    } | {
        alive: boolean;
        aliveFor: any;
    };
    exit(id: string): void;
    executeSupervisor(id: string, name: string, payload: string): Promise<{
        result: any;
    }>;
    getSupervisors(id: string): Promise<any>;
}
