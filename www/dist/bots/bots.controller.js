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
let BotsController = class BotsController {
    constructor(botsService) {
        this.botsService = botsService;
    }
    exit(id) {
        this.botsService.exitBot(id);
    }
    async executeSupervisor(id, name, payload) {
        return {
            result: await this.botsService.executeSupervisor(id, name, payload)
        };
    }
    async getSupervisors(id) {
        try {
            return await this.botsService.getBot(id).getSupervisors();
        }
        catch (error) {
            return [];
        }
    }
};
__decorate([
    common_1.Get(':id/exit'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "exit", null);
__decorate([
    common_1.Post(':id/executeSupervisor'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body('name')), __param(2, common_1.Body('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "executeSupervisor", null);
__decorate([
    common_1.Get(':id/getSupervisors'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "getSupervisors", null);
BotsController = __decorate([
    common_1.Controller('bots'),
    __metadata("design:paramtypes", [bots_service_1.BotsService])
], BotsController);
exports.BotsController = BotsController;
//# sourceMappingURL=bots.controller.js.map