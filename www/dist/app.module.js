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
const bots_module_1 = require("./bots/bots.module");
const streaming_module_1 = require("./streaming/streaming.module");
const auth_module_1 = require("./auth/auth.module");
const accounts_module_1 = require("./accounts/accounts.module");
const jobs_module_1 = require("./jobs/jobs.module");
const users_module_1 = require("./users/users.module");
const logs_module_1 = require("./logs/logs.module");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const account_entity_1 = require("./entities/account.entity");
const job_entity_1 = require("./entities/job.entity");
const connectionOptions = {
    "type": "mysql",
    "host": process.env.MYSQL_HOST || "localhost",
    "port": 3306,
    "username": process.env.MYSQL_USERNAME || "root",
    "password": process.env.MYSQL_PASSWORD || "",
    "database": process.env.MYSQL_DB || "insta",
    "entities": [__dirname + "/entities/*.entity{.js,.ts}"],
    "synchronize": true,
    "extra": {
        "charset": "utf8mb4"
    }
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(connectionOptions),
            auth_module_1.AuthModule,
            bots_module_1.BotsModule,
            streaming_module_1.StreamingModule,
            accounts_module_1.AccountsModule,
            jobs_module_1.JobsModule,
            users_module_1.UsersModule,
            logs_module_1.LogsModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, account_entity_1.Account, job_entity_1.Job])
        ],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map