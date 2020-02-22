import { Slave } from 'fork-with-emitter';
export interface ExecuteSupervisorCommand {
    name: string;
    payload?: string;
}
export declare type Bot = {
    slave: Slave;
    exit: () => any;
    executeSupervisor: (ExecuteSupervisorCommand: any) => Promise<any>;
    getSupervisors: () => Promise<any>;
};
declare const createBot: ({ dataDir, device, env, cookies, beforeLoad }: {
    dataDir: any;
    device: any;
    env?: {};
    cookies?: {};
    beforeLoad?: (slave: any) => void;
}) => Promise<{
    slave: Slave;
    exit(): void;
    executeSupervisor(executeSupervisorCommand: ExecuteSupervisorCommand): Promise<unknown>;
    getSupervisors(): Promise<unknown>;
}>;
export default createBot;
