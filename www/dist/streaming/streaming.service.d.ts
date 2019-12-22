import { BotsService } from '../bots/bots.service';
export declare class StreamingService {
    private readonly botsService;
    constructor(botsService: BotsService);
    private streams;
    getLastData(id: string): string;
    private updateLastData;
    private startStreaming;
    private stopStreaming;
    private attachStreamingHandler;
    private detachStreamingHandler;
    private orderBotToStartStreaming;
    private orderBotToStopStreaming;
    createStreaming(id: string, handleData: (data: string) => void): () => void;
}
