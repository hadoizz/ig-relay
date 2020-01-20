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
let Followed = class Followed {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Followed.prototype, "followedId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Followed.prototype, "login", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Followed.prototype, "unfollowed", void 0);
__decorate([
    typeorm_1.ManyToOne(type => account_entity_1.Account, account => account.followed, { cascade: ['insert'] }),
    __metadata("design:type", account_entity_1.Account)
], Followed.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Followed.prototype, "createdAt", void 0);
Followed = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(['account', 'login'], { unique: true })
], Followed);
exports.Followed = Followed;
//# sourceMappingURL=followed.entity.js.map