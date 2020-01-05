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
    fork: Slave;
    exit: () => any;
    executeSupervisor: (ExecuteSupervisorCommand: any) => Promise<any>;
    getSupervisors: () => Promise<any>;
};
declare const createBot: ({ login, password }: Credentials) => Promise<{
    info: {
        startedAt: number;
    };
    fork: Slave;
    exit(): void;
    executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand): Promise<unknown>;
    getSupervisors(): Promise<unknown>;
}>;
export default createBot;