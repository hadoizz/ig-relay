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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../accounts/account.entity");
let Job = class Job {
    updateDateCreation() {
        this.createdAt = Math.round(new Date().getTime() / 1000);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Job.prototype, "jobId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Job.prototype, "cron", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Job.prototype, "supervisor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Job.prototype, "supervisorPayload", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Job.prototype, "maxDelaySeconds", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Job.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Job.prototype, "updateDateCreation", null);
__decorate([
    typeorm_1.ManyToOne(type => account_entity_1.Account, account => account.jobs),
    __metadata("design:type", account_entity_1.Account)
], Job.prototype, "account", void 0);
Job = __decorate([
    typeorm_1.Entity()
], Job);
exports.Job = Job;
//# sourceMappingURL=job.entity.js.map