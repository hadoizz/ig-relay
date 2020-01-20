"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const jobs_controller_1 = require("./jobs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("../entities/job.entity");
const bots_module_1 = require("../bots/bots.module");
const accounts_module_1 = require("../accounts/accounts.module");
const user_entity_1 = require("../entities/user.entity");
const logs_module_1 = require("../logs/logs.module");
const account_entity_1 = require("../entities/account.entity");
let JobsModule = class JobsModule {
};
JobsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job, user_entity_1.User, account_entity_1.Account]), bots_module_1.BotsModule, accounts_module_1.AccountsModule, logs_module_1.LogsModule],
        providers: [jobs_service_1.JobsService],
        controllers: [jobs_controller_1.JobsController]
    })
], JobsModule);
exports.JobsModule = JobsModule;
//# sourceMappingURL=jobs.module.js.map