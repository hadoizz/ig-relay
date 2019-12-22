"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bots_service_1 = require("./bots.service");
describe('BotsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [bots_service_1.BotsService],
        }).compile();
        service = module.get(bots_service_1.BotsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=bots.service.spec.js.map