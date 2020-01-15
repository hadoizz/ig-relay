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
const job_entity_1 = require("./job.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
const delay_1 = __importDefault(require("delay"));
const random_int_1 = __importDefault(require("random-int"));
const bots_service_1 = require("../bots/bots.service");
const logs_service_1 = require("../logs/logs.service");
const createJob = (cron, fn) => new cron_1.CronJob(cron, fn, null, true, 'Europe/Warsaw');
let JobsService = class JobsService {
    constructor(jobRepository, userRepository, botsService, logsService) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.botsService = botsService;
        this.logsService = logsService;
        this.loadedJobs = new Map();
        if (process.env.NODE_ENV === 'production')
            this.loadJobs();
    }
    async loadJobs() {
        (await this.getAllJobs()).forEach(({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds, accountId, login, password }) => {
            const job = createJob(cron, async () => {
                console.log(`Starting job ${jobId}`);
                await delay_1.default(random_int_1.default(0, maxDelaySeconds * 1000));
                if (!this.loadedJobs.has(jobId))
                    return;
                const { id } = await this.botsService.createBot({ login, password }, slave => this.logsService.attachLogsListenersToSlave(slave, accountId));
                const result = await this.botsService.executeSupervisor(id, supervisor, supervisorPayload);
                await this.botsService.exitBot(id);
                if (result) {
                    console.log(`Ended job ${jobId} with result ${result}`);
                    return;
                }
                console.log(`Ended job ${jobId}`);
            });
            this.loadedJobs.set(jobId, job);
            console.log(`Loaded job ${jobId}`);
        });
    }
    async getAllJobs() {
        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .select(['jobId', 'cron', 'supervisor', 'supervisorPayload', 'maxDelaySeconds', 'accountId', 'account.login as login', 'account.password as password'])
            .innerJoin('job.account', 'account')
            .orderBy('createdAt', 'DESC')
            .getRawMany();
        return jobs;
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
        const hasJob = Boolean(await this.userRepository
            .createQueryBuilder('user')
            .select(['jobId'])
            .innerJoin('user.accounts', 'account')
            .innerJoin('account.jobs', 'job')
            .where('user.userId = :userId', { userId })
            .andWhere('job.jobId = :jobId', { jobId })
            .getRawOne());
        if (!hasJob)
            return;
        if (this.loadedJobs.has(jobId))
            this.loadedJobs.get(jobId).stop();
        this.jobRepository.delete(jobId);
    }
};
JobsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(job_entity_1.Job)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        bots_service_1.BotsService,
        logs_service_1.LogsService])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map