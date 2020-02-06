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
const cron_1 = require("cron");
const job_entity_1 = require("../entities/job.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const delay_1 = __importDefault(require("delay"));
const random_int_1 = __importDefault(require("random-int"));
const bots_service_1 = require("../bots/bots.service");
const account_entity_1 = require("../entities/account.entity");
const delay_2 = __importDefault(require("delay"));
const config_service_1 = require("../config/config.service");
const createJob = (cron, fn) => new cron_1.CronJob(cron, fn, null, true, 'Europe/Warsaw');
let JobsService = class JobsService {
    constructor(jobRepository, userRepository, accountRepository, botsService, configService) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.botsService = botsService;
        this.configService = configService;
        this.loadedJobs = new Map();
        if (this.configService.isProduction())
            this.loadJobs();
    }
    async loadJob({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds, accountId }) {
        const job = createJob(cron, async () => {
            console.log(`Starting job ${jobId}`);
            await delay_1.default(random_int_1.default(0, maxDelaySeconds * 1000));
            if (!this.loadedJobs.has(jobId))
                return;
            const id = await this.botsService.createBot({ accountId });
            await delay_2.default(10000);
            try {
                const result = await this.botsService.get(id).executeSupervisor({ name: supervisor, payload: supervisorPayload });
                console.log(`Ended job ${jobId}`, result ? `with result ${result}` : undefined);
            }
            catch (error) {
                console.log(`Ended job ${jobId} with error ${error}`);
            }
            finally {
                this.botsService.exit(id);
            }
        });
        this.loadedJobs.set(jobId, job);
        console.log(`Loaded job ${jobId}`);
    }
    unloadJob(jobId) {
        if (this.loadedJobs.has(jobId))
            this.loadedJobs.get(jobId).stop();
    }
    unloadJobs() {
        this.loadedJobs.forEach(job => job.stop());
        this.loadedJobs.clear();
    }
    async loadJobs() {
        const jobs = await this.getAllJobs();
        for (const job of jobs)
            await this.loadJob(job);
    }
    async getAllJobs() {
        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds', 'accountId'])
            .innerJoin('job.account', 'account')
            .orderBy('createdAt', 'DESC')
            .getRawMany();
        return jobs;
    }
    async hasJob(userId, jobId) {
        return Boolean(await this.userRepository
            .createQueryBuilder('user')
            .select(['jobId'])
            .innerJoin('user.accounts', 'account')
            .innerJoin('account.jobs', 'job')
            .where('user.userId = :userId', { userId })
            .andWhere('job.jobId = :jobId', { jobId })
            .getRawOne());
    }
    async getJobs(userId, accountId) {
        const jobs = await this.userRepository
            .createQueryBuilder('user')
            .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds'])
            .innerJoin('user.accounts', 'account')
            .innerJoin('account.jobs', 'job')
            .where('user.userId = :userId', { userId })
            .andWhere('account.accountId = :accountId', { accountId })
            .orderBy('job.createdAt', 'DESC')
            .getRawMany();
        return jobs;
    }
    async deleteJob(userId, jobId) {
        if (!(await this.hasJob(userId, jobId)))
            return;
        this.unloadJob(jobId);
        this.jobRepository.delete(jobId);
    }
    async updateJob(userId, jobId, changes) {
        if (!(await this.hasJob(userId, jobId)))
            return;
        await this.jobRepository
            .createQueryBuilder('job')
            .update('job')
            .set(changes)
            .where('job.jobId = :jobId', { jobId })
            .execute();
        if (this.configService.isProduction()) {
            this.unloadJobs();
            await this.loadJobs();
        }
    }
    async createJob(userId, accountId, job) {
        const account = await this.accountRepository
            .createQueryBuilder('account')
            .where('account.user = :userId', { userId })
            .andWhere('account.accountId = :accountId', { accountId })
            .getOne();
        this.jobRepository.insert(Object.assign(Object.assign({}, job), { account }));
        if (this.configService.isProduction()) {
            this.unloadJobs();
            await this.loadJobs();
        }
    }
};
JobsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(job_entity_1.Job)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        bots_service_1.BotsService,
        config_service_1.ConfigService])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map