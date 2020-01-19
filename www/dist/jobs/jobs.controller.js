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
const jobs_service_1 = require("./jobs.service");
const passport_1 = require("@nestjs/passport");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async getJobs(accountId, req) {
        return await this.jobsService.getJobs(parseInt(req.user.userId), parseInt(accountId));
    }
    async createJob(accountId, req, body) {
        return await this.jobsService.createJob(parseInt(req.user.userId), parseInt(accountId), body);
    }
    async updateJob(jobId, req, body) {
        return await this.jobsService.updateJob(parseInt(req.user.userId), parseInt(jobId), body);
    }
    async deleteJob(jobId, req) {
        return await this.jobsService.deleteJob(parseInt(req.user.userId), parseInt(jobId));
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/account/:accountId'),
    __param(0, common_1.Param('accountId')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobs", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('/account/:accountId'),
    __param(0, common_1.Param('accountId')), __param(1, common_1.Request()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createJob", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('/:jobId'),
    __param(0, common_1.Param('jobId')), __param(1, common_1.Request()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJob", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('/:jobId'),
    __param(0, common_1.Param('jobId')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJob", null);
JobsController = __decorate([
    common_1.Controller('jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
exports.JobsController = JobsController;
//# sourceMappingURL=jobs.controller.js.map