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
const log_entity_1 = require("../entities/log.entity");
const typeorm_2 = require("typeorm");
const followed_entity_1 = require("../entities/followed.entity");
const account_entity_1 = require("../entities/account.entity");
let LogsService = class LogsService {
    constructor(logRepository, followedRepository, accountRepository) {
        this.logRepository = logRepository;
        this.followedRepository = followedRepository;
        this.accountRepository = accountRepository;
    }
    attachLogsListenersToSlave(slave, accountId) {
        slave.on('log', async ({ type, payload }) => {
            const account = await this.accountRepository.findOne(accountId);
            if (type === 'followed') {
                this.followedRepository.insert({ login: payload, account });
                return;
            }
            else if (type === 'unfollowed') {
                this.followedRepository.update({ login: payload, account }, { unfollowed: true });
                return;
            }
            this.logRepository.insert({ type, payload, account });
        });
        slave.onRequest('isFollowed', async (login) => {
            const row = await this.followedRepository
                .createQueryBuilder('followed')
                .innerJoin('followed.account', 'account')
                .andWhere('followed.login = :login', { login })
                .andWhere('account.accountId = :accountId', { accountId })
                .getRawOne();
            if (row === undefined)
                return false;
            return true;
        });
        slave.onRequest('oldestFollowed', async () => {
            const row = await this.followedRepository
                .createQueryBuilder('followed')
                .select('followed.login')
                .innerJoin('followed.account', 'account')
                .where('account.accountId = :accountId', { accountId })
                .orderBy('followed.createdAt', 'ASC')
                .getRawOne();
            if (row === undefined)
                return null;
            return row.login;
        });
        slave.onRequest('shouldBeUnfollowed', async (login) => {
            const row = await this.followedRepository
                .createQueryBuilder('followed')
                .innerJoin('followed.account', 'account')
                .where('followed.createdAt <= now() - interval 2 day')
                .andWhere('followed.login = :login', { login })
                .andWhere('account.accountId = :accountId', { accountId })
                .getRawOne();
            if (row === undefined)
                return false;
            return true;
        });
        console.log('attached logs listeners to slave');
    }
    async getLogs(userId, accountId) {
        return await this.logRepository
            .createQueryBuilder('log')
            .select(['type', 'payload', 'log.createdAt as createdAt'])
            .innerJoin('log.account', 'account')
            .innerJoin('account.user', 'user')
            .where('account.accountId = :accountId', { accountId })
            .andWhere('user.userId = :userId', { userId })
            .orderBy('log.createdAt', 'DESC')
            .take(200)
            .getRawMany();
    }
    async getFollowedCounts(userId, accountId) {
        return await this.followedRepository
            .createQueryBuilder('followed')
            .select(['COUNT(followed.followedId) as count', 'unfollowed'])
            .innerJoin('followed.account', 'account')
            .innerJoin('account.user', 'user')
            .where('account.accountId = :accountId', { accountId })
            .andWhere('user.userId = :userId', { userId })
            .groupBy('unfollowed')
            .getRawMany();
    }
};
LogsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(log_entity_1.Log)),
    __param(1, typeorm_1.InjectRepository(followed_entity_1.Followed)),
    __param(2, typeorm_1.InjectRepository(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LogsService);
exports.LogsService = LogsService;
//# sourceMappingURL=logs.service.js.map