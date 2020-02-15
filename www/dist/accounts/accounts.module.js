"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const auth_module_1 = require("../auth/auth.module");
const account_entity_1 = require("../entities/account.entity");
const users_module_1 = require("../users/users.module");
const log_entity_1 = require("../entities/log.entity");
const user_entity_1 = require("../entities/user.entity");
const followed_entity_1 = require("../entities/followed.entity");
const job_entity_1 = require("../entities/job.entity");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, job_entity_1.Job, log_entity_1.Log, user_entity_1.User, followed_entity_1.Followed]), auth_module_1.AuthModule, users_module_1.UsersModule],
        providers: [accounts_service_1.AccountsService],
        controllers: [accounts_controller_1.AccountsController],
        exports: [accounts_service_1.AccountsService]
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map