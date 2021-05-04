"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const all_exception_filter_1 = require("./all-exception.filter");
const app_module_1 = require("./app.module");
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors_1.default());
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter());
    await app.listen(process.env.PORT || 8080, '0.0.0.0');
    console.log(`Server listening on port: ${process.env.PORT || 8080}`);
    if (process.env.NODE_ENV === 'production')
        console.log('Production mode');
})();
//# sourceMappingURL=main.js.map