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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bots_service_1 = require("./bots.service");
const accounts_service_1 = require("../accounts/accounts.service");
let BotsController = class BotsController {
    constructor(botsService, accountsService) {
        this.botsService = botsService;
        this.accountsService = accountsService;
    }
    getList() {
        return this.botsService.getList();
    }
    async start(req, accountId) {
        accountId = Number(accountId);
        const id = await this.botsService.createBot({ accountId });
        return { id };
    }
    exit(botId) {
        this.botsService.exit(botId);
    }
    exit_post(botId) {
        this.botsService.exit(botId);
    }
    async executeSupervisor(botId, name, payload) {
        return {
            result: await this.botsService.get(botId).executeSupervisor({ name, payload })
        };
    }
    async getSupervisors(botId) {
        try {
            return await this.botsService.get(botId).getSupervisors();
        }
        catch (error) {
            return [];
        }
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "getList", null);
__decorate([
    common_1.Get('start/account/:accountId'),
    __param(0, common_1.Request()), __param(1, common_1.Param('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "start", null);
__decorate([
    common_1.Get(':botId/exit'),
    __param(0, common_1.Param('botId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "exit", null);
__decorate([
    common_1.Post(':botId/exit'),
    __param(0, common_1.Param('botId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "exit_post", null);
__decorate([
    common_1.Post(':botId/executeSupervisor'),
    __param(0, common_1.Param('botId')), __param(1, common_1.Body('name')), __param(2, common_1.Body('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "executeSupervisor", null);
__decorate([
    common_1.Get(':botId/supervisors'),
    __param(0, common_1.Param('botId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "getSupervisors", null);
BotsController = __decorate([
    common_1.Controller('bots'),
    __metadata("design:paramtypes", [bots_service_1.BotsService,
        accounts_service_1.AccountsService])
], BotsController);
exports.BotsController = BotsController;
//# sourceMappingURL=bots.controller.js.map