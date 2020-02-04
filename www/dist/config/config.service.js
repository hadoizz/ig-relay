"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
class ConfigService {
    constructor() {
        this.env = {};
        fs_1.default.readFile('.env', (err, data) => {
            if (err)
                return;
            const parsed = dotenv_1.default.parse(data);
            Object.entries(parsed).forEach(([key, value]) => {
                this.env[key] = value;
                if (!Object.prototype.hasOwnProperty.call(process.env, key))
                    process.env[key] = value;
                else
                    console.log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
            });
        });
    }
    get(key) {
        return this.env[key];
    }
    isProduction() {
        return this.get('NODE_ENV') === 'production';
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map