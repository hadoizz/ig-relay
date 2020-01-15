"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const cors_1 = __importDefault(require("cors"));
const app_module_1 = require("./app.module");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors_1.default());
    await app.listen(process.env.PORT || 8080);
    console.log(`Server listening on port: ${process.env.PORT || 8080}`);
})();
//# sourceMappingURL=main.js.map