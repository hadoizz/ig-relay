import { Slave } from 'fork-with-emitter';
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
declare const createBot: ({ cookies, dataDir, beforeLoad }: {
    cookies: any;
    dataDir: any;
    beforeLoad: any;
}) => Promise<{
    info: {
        startedAt: number;
    };
    slave: Slave;
    exit(): void;
    executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand): Promise<void>;
    getSupervisors(): Promise<unknown>;
}>;
export default createBot;
