"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bots_service_1 = require("../bots/bots.service");
let StreamingService = class StreamingService {
    constructor(botsService) {
        this.botsService = botsService;
        this.streams = Object.create(null);
    }
    getLastData(id) {
        return this.streams[id].lastData;
    }
    startStreaming(id) {
        const handleUpdateLastData = (data) => {
            this.streams[id].lastData = data;
        };
        this.streams[id] = {
            lastData: '',
            connectedClients: 0,
            handleUpdateLastData
        };
        this.attachStreamingHandler(id, handleUpdateLastData);
        this.orderBotToStartStreaming(id);
        console.log(`Start streaming ${id}`);
    }
    stopStreaming(id) {
        this.detachStreamingHandler(id, this.streams[id].handleUpdateLastData);
        this.orderBotToStopStreaming(id);
        delete this.streams[id];
        console.log(`Stop streaming ${id}`);
    }
    attachStreamingHandler(id, handler) {
        this.botsService.get(id) && this.botsService.get(id).slave.on('streaming', handler);
    }
    detachStreamingHandler(id, handler) {
        this.botsService.get(id) && this.botsService.get(id).slave.removeListener('streaming', handler);
    }
    orderBotToStartStreaming(id) {
        this.botsService.get(id) && this.botsService.get(id).slave.emit('startStreaming');
    }
    orderBotToStopStreaming(id) {
        this.botsService.get(id) && this.botsService.get(id).slave.emit('stopStreaming');
    }
    createStreaming(id, handleData) {
        if (this.botsService.get(id) === null)
            return;
        if (!this.streams[id])
            this.startStreaming(id);
        this.streams[id].connectedClients++;
        this.attachStreamingHandler(id, handleData);
        if (this.getLastData(id))
            handleData(this.getLastData(id));
        return () => {
            this.streams[id].connectedClients--;
            this.detachStreamingHandler(id, handleData);
            if (this.streams[id].connectedClients === 0)
                this.stopStreaming(id);
        };
    }
};
StreamingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [bots_service_1.BotsService])
], StreamingService);
exports.StreamingService = StreamingService;
//# sourceMappingURL=streaming.service.js.map