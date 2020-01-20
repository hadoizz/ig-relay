import { Slave } from 'fork-with-emitter';
export declare class Credentials {
    login: string;
    password: string;
}
export interface ExecuteSupervisorCommand {
    name: string;
    payload?: string;
}
export declare type Bot = {
    info: {
        startedAt: number;
    };
    slave: Slave;
    exit: () => any;
    executeSupervisor: (ExecuteSupervisorCommand: any) => Promise<any>;
    getSupervisors: () => Promise<any>;
};
declare const createBot: ({ login, password }: Credentials, beforeLoad?: (Slave: any) => any) => Promise<{
    info: {
        startedAt: number;
    };
    slave: Slave;
    exit(): void;
    executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand): Promise<unknown>;
    getSupervisors(): Promise<unknown>;
}>;
export default createBot;
