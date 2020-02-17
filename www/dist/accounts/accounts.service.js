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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../entities/account.entity");
const users_service_1 = require("../users/users.service");
const createDataDir_1 = __importDefault(require("./utils/createDataDir"));
const deleteDataDir_1 = __importDefault(require("./utils/deleteDataDir"));
const job_entity_1 = require("../entities/job.entity");
const followed_entity_1 = require("../entities/followed.entity");
const log_entity_1 = require("../entities/log.entity");
let AccountsService = class AccountsService {
    constructor(accountRepository, jobRepository, followedRepository, logRepository, usersService) {
        this.accountRepository = accountRepository;
        this.jobRepository = jobRepository;
        this.followedRepository = followedRepository;
        this.logRepository = logRepository;
        this.usersService = usersService;
    }
    async deleteAccount(accountId) {
        const account = await this.accountRepository.findOne(accountId);
        await this.jobRepository.delete({ account });
        await this.followedRepository.delete({ account });
        await this.logRepository.delete({ account });
        await this.accountRepository.delete({ accountId });
        deleteDataDir_1.default(accountId);
        console.log(`Deleted ${accountId} account (${account.login})`);
    }
    async getAccounts(userId) {
        const accounts = await this.accountRepository
            .createQueryBuilder('account')
            .select(['login', 'accountId', 'logged'])
            .where('account.user = :userId', { userId })
            .getRawMany();
        accounts.filter(({ logged }) => !logged).map(({ accountId }) => this.deleteAccount(accountId));
        return accounts.filter(({ logged }) => logged);
    }
    async hasAccount(userId, accountId) {
        return (await this.accountRepository
            .createQueryBuilder('account')
            .select(['accountId'])
            .where('account.user = :userId', { userId })
            .andWhere('accountId = :accountId', { accountId })
            .getRawOne()) !== undefined;
    }
    async setLogged(userId, accountId, login) {
        await this.accountRepository
            .createQueryBuilder('account')
            .update(account_entity_1.Account)
            .set({
            logged: true,
            login
        })
            .where('user = :userId', { userId })
            .andWhere('accountId = :accountId', { accountId })
            .execute();
    }
    async createAccount(userId, { login }) {
        const user = await this.usersService.getUser({ userId });
        if (!user)
            throw `Can't find user`;
        if (!login)
            throw `Missing login`;
        const insertResult = await this.accountRepository.createQueryBuilder()
            .insert()
            .into(account_entity_1.Account)
            .values({
            login,
            user
        })
            .execute();
        const accountId = insertResult.identifiers[0].accountId;
        if (accountId === undefined)
            throw `Can't create account`;
        await createDataDir_1.default(accountId);
        return {
            accountId
        };
    }
};
AccountsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_entity_1.Account)),
    __param(1, typeorm_1.InjectRepository(job_entity_1.Job)),
    __param(2, typeorm_1.InjectRepository(followed_entity_1.Followed)),
    __param(3, typeorm_1.InjectRepository(log_entity_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map