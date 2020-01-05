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
const ms_1 = __importDefault(require("ms"));
const createBot_1 = __importDefault(require("./utils/createBot"));
const getId_1 = __importDefault(require("./utils/getId"));
const config_service_1 = require("../config/config.service");
let BotsService = class BotsService {
    constructor(configService) {
        this.configService = configService;
        this.bots = new Map();
        this.devBot = null;
    }
    async createBot(credentials) {
        const id = getId_1.default();
        const bot = await createBot_1.default(credentials);
        this.bots.set(id, bot);
        return { id, bot };
    }
    getCredentialsFromConfig() {
        return {
            login: this.configService.get('LOGIN'),
            password: this.configService.get('PASSWORD')
        };
    }
    async createDevBot(credentials = this.getCredentialsFromConfig()) {
        if (this.devBot === null) {
            const id = getId_1.default();
            const botPromise = createBot_1.default(credentials);
            this.devBot = { id, botPromise };
            const bot = await botPromise;
            this.bots.set(id, bot);
            return { id };
        }
        await this.devBot.botPromise;
        return {
            id: this.devBot.id
        };
    }
    exitBot(id) {
        if (!this.hasBot(id))
            return;
        this.bots.get(id).exit();
        this.bots.delete(id);
        if (this.devBot !== null && this.devBot.id === id)
            this.devBot = null;
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
    getBotStatus(id) {
        if (!this.hasBot(id))
            return {
                alive: false
            };
        const { info: { startedAt } } = this.getBot(id);
        return {
            alive: true,
            aliveFor: ms_1.default(+new Date - startedAt, { long: true })
        };
    }
    getDevBotStatus() {
        if (this.devBot === null)
            return {
                alive: false
            };
        return Object.assign({ id: this.devBot.id }, this.getBotStatus(this.devBot.id));
    }
    getBotsCount() {
        return this.bots.size;
    }
};
BotsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], BotsService);
exports.BotsService = BotsService;
//# sourceMappingURL=bots.service.js.map