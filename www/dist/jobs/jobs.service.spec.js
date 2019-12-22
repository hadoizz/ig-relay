"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jobs_service_1 = require("./jobs.service");
describe('JobsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [jobs_service_1.JobsService],
        }).compile();
        service = module.get(jobs_service_1.JobsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=jobs.service.spec.js.map