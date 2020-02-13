import { BotsService } from './bots.service';
import { AccountsService } from '../accounts/accounts.service';
export declare class BotsController {
    private readonly botsService;
    private readonly accountsService;
    constructor(botsService: BotsService, accountsService: AccountsService);
    getList(): {
        id: string;
        created: any;
        accountId: number;
    }[];
    start(req: any, accountId: string | number): Promise<{
        id: string;
    }>;
    exit(botId: string): void;
    exit_post(botId: string): void;
    executeSupervisor(botId: string, name: string, payload: string): Promise<{
        result: any;
    }>;
    getSupervisors(botId: string): Promise<any>;
}
