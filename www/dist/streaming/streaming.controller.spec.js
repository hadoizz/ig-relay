"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const streaming_controller_1 = require("./streaming.controller");
describe('Streaming Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [streaming_controller_1.StreamingController],
        }).compile();
        controller = module.get(streaming_controller_1.StreamingController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=streaming.controller.spec.js.map