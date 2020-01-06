"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const accounts_controller_1 = require("./accounts.controller");
describe('Accounts Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [accounts_controller_1.AccountsController],
        }).compile();
        controller = module.get(accounts_controller_1.AccountsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=accounts.controller.spec.js.map