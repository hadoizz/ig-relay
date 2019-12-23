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
        this.updateLastData = (id) => {
            return (data) => this.streams[id].lastData = data;
        };
    }
    getLastData(id) {
        if (this.streams[id]) {
            return this.streams[id].lastData;
        }
        return null;
    }
    startStreaming(id) {
        this.streams[id] = {
            lastData: '',
            connectedClients: 0
        };
        this.attachStreamingHandler(id, this.updateLastData);
        this.orderBotToStartStreaming(id);
        console.log(`Start streaming ${id}`);
    }
    stopStreaming(id) {
        this.detachStreamingHandler(id, this.updateLastData);
        this.orderBotToStopStreaming(id);
        delete this.streams[id];
        console.log(`Stop streaming ${id}`);
    }
    attachStreamingHandler(id, handler) {
        if (!this.botsService.hasBot(id))
            return;
        this.botsService.getBot(id).fork.on('streaming', handler);
    }
    detachStreamingHandler(id, handler) {
        if (!this.botsService.hasBot(id))
            return;
        this.botsService.getBot(id).fork.removeListener('streaming', handler);
    }
    orderBotToStartStreaming(id) {
        if (!this.botsService.hasBot(id))
            return;
        this.botsService.getBot(id).fork.emit('startStreaming');
    }
    orderBotToStopStreaming(id) {
        if (!this.botsService.hasBot(id))
            return;
        this.botsService.getBot(id).fork.emit('stopStreaming');
    }
    createStreaming(id, handleData) {
        if (!this.botsService.hasBot(id))
            return;
        if (!this.streams[id])
            this.startStreaming(id);
        this.streams[id].connectedClients++;
        this.attachStreamingHandler(id, handleData);
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