"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const accounts_service_1 = require("./accounts.service");
describe('AccountsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [accounts_service_1.AccountsService],
        }).compile();
        service = module.get(accounts_service_1.AccountsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=accounts.service.spec.js.map