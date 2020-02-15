import { BotsService } from '../bots/bots.service';
export declare class StreamingService {
    private readonly botsService;
    constructor(botsService: BotsService);
    private streams;
    handleStreaming(botId: string, handleData: (data: string) => void): () => void;
}
