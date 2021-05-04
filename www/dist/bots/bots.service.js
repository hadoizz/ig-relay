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
const config_service_1 = require("../config/config.service");
const createBot_1 = __importDefault(require("./utils/createBot"));
const createDataDir_1 = __importDefault(require("./utils/createDataDir"));
const getId_1 = __importDefault(require("./utils/getId"));
const removeDataDir_1 = __importDefault(require("./utils/removeDataDir"));
const removeDataDirs_1 = __importDefault(require("./utils/removeDataDirs"));
let BotsService = class BotsService {
    constructor(configService) {
        this.configService = configService;
        this.botInstances = new Map();
        removeDataDirs_1.default();
    }
    async createBot(login, password) {
        const botId = await getId_1.default();
        const cleanup = () => this.exit(botId);
        const bot = await createBot_1.default({
            dataDir: await createDataDir_1.default(botId),
            env: Object.assign({ LOGIN: login, PASSWORD: password, NODE_ENV: this.configService.get('NODE_ENV') }, (this.configService.get('HEADLESS') && {
                HEADLESS: this.configService.get('HEADLESS'),
            })),
            beforeLoad: (slave) => {
                slave.fork.once('exit', cleanup);
                slave.fork.once('error', cleanup);
            },
        });
        this.botInstances.set(botId, {
            bot,
            createdAt: new Date(),
        });
        setTimeout(cleanup, 1000 * 60 * 30);
        console.log(`Created ${botId} bot`);
        return botId;
    }
    exit(botId) {
        if (this.botInstances.has(botId)) {
            this.botInstances.get(botId).bot.exit();
            this.botInstances.delete(botId);
            setTimeout(() => {
                try {
                    removeDataDir_1.default(botId);
                }
                catch (error) {
                    console.error(`Couldn't remove ${botId} bot's dataDir`, error);
                }
            }, 5000);
            console.log(`Exitted ${botId} bot`);
        }
    }
    get(botId) {
        if (this.botInstances.has(botId))
            return this.botInstances.get(botId).bot;
        return null;
    }
    getInfo(botId) {
        if (!this.botInstances.has(botId))
            throw `Bot with this ID has expired.`;
        const botInstance = this.botInstances.get(botId);
        return {
            botId,
            created: ms_1.default(Date.now() - botInstance.createdAt.getTime()),
        };
    }
    getList() {
        return [...this.botInstances.keys()].map(botId => this.getInfo(botId));
    }
};
BotsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], BotsService);
exports.BotsService = BotsService;
//# sourceMappingURL=bots.service.js.map