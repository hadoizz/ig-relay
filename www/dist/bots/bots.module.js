"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bots_service_1 = require("./bots.service");
const bots_controller_1 = require("./bots.controller");
const config_module_1 = require("../config/config.module");
const logs_module_1 = require("../logs/logs.module");
const accounts_module_1 = require("../accounts/accounts.module");
let BotsModule = class BotsModule {
};
BotsModule = __decorate([
    common_1.Module({
        providers: [bots_service_1.BotsService],
        controllers: [bots_controller_1.BotsController],
        imports: [config_module_1.ConfigModule, logs_module_1.LogsModule, accounts_module_1.AccountsModule],
        exports: [bots_service_1.BotsService]
    })
], BotsModule);
exports.BotsModule = BotsModule;
//# sourceMappingURL=bots.module.js.map