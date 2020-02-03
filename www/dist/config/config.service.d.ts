export declare class ConfigService {
    private readonly env;
    constructor();
    get(key: string): string;
    isProduction(): boolean;
}
