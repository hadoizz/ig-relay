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
    handleStreaming(botId, handleData) {
        const bot = this.botsService.get(botId);
        if (!bot)
            return () => { };
        if (botId in this.streams) {
            this.streams[botId].clientsCount++;
            handleData(this.streams[botId].previousData);
        }
        else {
            bot.slave.emit('startStreaming');
            this.streams[botId] = {
                previousData: '',
                clientsCount: 1,
            };
        }
        const handler = (data) => {
            if (this.streams[botId].previousData.length === data.length)
                return;
            this.streams[botId].previousData = data;
            handleData(data);
        };
        bot.slave.on('streaming', handler);
        return () => {
            this.streams[botId].clientsCount--;
            if (this.streams[botId].clientsCount === 0) {
                delete this.streams[botId];
                bot.slave.emit('stopStreaming');
            }
            bot.slave.removeListener('streaming', handler);
        };
    }
};
StreamingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [bots_service_1.BotsService])
], StreamingService);
exports.StreamingService = StreamingService;
//# sourceMappingURL=streaming.service.js.map