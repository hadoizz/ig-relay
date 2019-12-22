"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
class ConfigService {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.env = process.env;
            return;
        }
        this.env = dotenv_1.default.parse(fs_1.default.readFileSync('.env'));
    }
    get(key) {
        return this.env[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map