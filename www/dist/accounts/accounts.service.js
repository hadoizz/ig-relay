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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./account.entity");
let AccountsService = class AccountsService {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
        this.getCredentials(1, 1);
    }
    async getAccounts(userId) {
        const accounts = await this.accountRepository
            .createQueryBuilder('account')
            .select(['login', 'accountId'])
            .innerJoin('account.user', 'user')
            .where('user.userId = :userId', { userId })
            .getRawMany();
        return accounts;
    }
    async getCredentials(userId, accountId) {
        const credentials = await this.accountRepository
            .createQueryBuilder('account')
            .select(['account.login as login', 'account.password as password'])
            .innerJoin('account.user', 'user')
            .where('account.accountId = :accountId', { accountId })
            .andWhere('user.userId = :userId', { userId })
            .getRawMany();
        console.log(credentials);
        return credentials;
    }
};
AccountsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map