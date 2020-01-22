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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const stringio_1 = require("@rauschma/stringio");
const createBot_1 = __importDefault(require("./utils/createBot"));
const getId_1 = __importDefault(require("./utils/getId"));
const config_service_1 = require("../config/config.service");
let BotsService = class BotsService {
    constructor(configService) {
        this.configService = configService;
        this.bots = new Map();
    }
    async createBot(cookies, beforeLoad) {
        const id = getId_1.default();
        const bot = await createBot_1.default(cookies, beforeLoad);
        this.bots.set(id, bot);
        this.clearAfterExit(bot, id);
        return { id, bot };
    }
    async clearAfterExit(bot, id) {
        try {
            await stringio_1.onExit(bot.slave.fork);
        }
        catch (error) { }
        this.clearBot(id);
    }
    clearBot(id) {
        this.bots.delete(id);
    }
    exitBot(id) {
        if (!this.hasBot(id))
            return;
        this.bots.get(id).exit();
        this.clearBot(id);
        console.log(`Exitted ${id} bot`);
    }
    async executeSupervisor(id, name, payload) {
        if (!this.hasBot(id))
            return;
        return this.getBot(id).executeSupervisor({ name, payload });
    }
    hasBot(id) {
        return this.bots.has(id);
    }
    getBot(id) {
        return this.bots.get(id);
    }
};
BotsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], BotsService);
exports.BotsService = BotsService;
//# sourceMappingURL=bots.service.js.map