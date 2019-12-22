"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const streaming_controller_1 = require("./streaming.controller");
const bots_module_1 = require("../bots/bots.module");
const nestjs_sse_1 = require("nestjs-sse");
const streaming_service_1 = require("./streaming.service");
let StreamingModule = class StreamingModule {
    configure(consumer) {
        consumer
            .apply(nestjs_sse_1.SSEMiddleware)
            .forRoutes(streaming_controller_1.StreamingController);
    }
};
StreamingModule = __decorate([
    common_1.Module({
        controllers: [streaming_controller_1.StreamingController],
        imports: [bots_module_1.BotsModule],
        providers: [streaming_service_1.StreamingService]
    })
], StreamingModule);
exports.StreamingModule = StreamingModule;
//# sourceMappingURL=streaming.module.js.map