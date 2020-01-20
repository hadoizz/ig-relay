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
const job_entity_1 = require("./job.entity");
const user_entity_1 = require("./user.entity");
const log_entity_1 = require("./log.entity");
const followed_entity_1 = require("./followed.entity");
let Account = class Account {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Account.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Account.prototype, "login", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.accounts, { cascade: ['insert'] }),
    __metadata("design:type", user_entity_1.User)
], Account.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => job_entity_1.Job, job => job.account, { cascade: ['insert'] }),
    __metadata("design:type", Array)
], Account.prototype, "jobs", void 0);
__decorate([
    typeorm_1.OneToMany(type => log_entity_1.Log, log => log.account, { cascade: ['insert'] }),
    __metadata("design:type", Array)
], Account.prototype, "logs", void 0);
__decorate([
    typeorm_1.OneToMany(type => followed_entity_1.Followed, Followed => Followed.account, { cascade: ['insert'] }),
    __metadata("design:type", Array)
], Account.prototype, "followed", void 0);
Account = __decorate([
    typeorm_1.Entity()
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map