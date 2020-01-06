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
const job_entity_1 = require("./job.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
let JobsService = class JobsService {
    constructor(jobsRepository, usersRepository) {
        this.jobsRepository = jobsRepository;
        this.usersRepository = usersRepository;
    }
    async getJobs(userId, accountId) {
        return await this.jobsRepository.find({
            select: ['jobId', 'cron', 'supervisor', 'supervisorPayload', 'sleepMin', 'sleepMax'],
            join: {
                alias: 'job',
                innerJoin: {
                    'account': 'job.account',
                    'user': 'account.user'
                }
            },
            where: qb => {
                qb
                    .where('account.accountId = :accountId', { accountId })
                    .andWhere('user.userId = :userId', { userId });
            },
            order: { createdAt: 'DESC' }
        });
    }
    async createJob(job) {
        return await this.jobsRepository.save(job);
    }
    async updateJob(job) {
        return await this.jobsRepository.save(job);
    }
    async deleteJob(job) {
        return await this.jobsRepository.delete(job);
    }
};
JobsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(job_entity_1.Job)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map