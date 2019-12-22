"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const streaming_service_1 = require("./streaming.service");
describe('StreamingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [streaming_service_1.StreamingService],
        }).compile();
        service = module.get(streaming_service_1.StreamingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=streaming.service.spec.js.map