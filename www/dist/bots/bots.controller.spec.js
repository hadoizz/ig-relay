"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bots_controller_1 = require("./bots.controller");
describe('Bots Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [bots_controller_1.BotsController],
        }).compile();
        controller = module.get(bots_controller_1.BotsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=bots.controller.spec.js.map