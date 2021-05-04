import { Slave } from 'fork-with-emitter';
export interface Data {
    name: string;
    payload?: string;
}
export declare type Bot = {
    slave: Slave;
    exit: () => any;
    executeCommand: (ExecuteCommand: any) => Promise<any>;
    getCommands: () => Promise<any>;
};
declare const createBot: ({ dataDir, env, cookies, beforeLoad, }: {
    dataDir: any;
    env?: {};
    cookies?: {};
    beforeLoad?: (slave: Slave) => void;
}) => Promise<{
    slave: Slave;
    exit(): void;
    executeCommand(data: Data): Promise<unknown>;
    getCommands(): Promise<unknown>;
}>;
export default createBot;
