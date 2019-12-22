"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jobs_controller_1 = require("./jobs.controller");
describe('Jobs Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [jobs_controller_1.JobsController],
        }).compile();
        controller = module.get(jobs_controller_1.JobsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=jobs.controller.spec.js.map