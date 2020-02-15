"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = __importDefault(require("rimraf"));
const getDataDir_1 = __importDefault(require("./getDataDir"));
exports.default = (accountId) => {
    return new Promise(resolve => {
        const dataDir = getDataDir_1.default(accountId);
        rimraf_1.default(dataDir, resolve);
    });
};
//# sourceMappingURL=deleteDataDir.js.map