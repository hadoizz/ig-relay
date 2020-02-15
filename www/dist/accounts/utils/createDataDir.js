"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp_1 = __importDefault(require("mkdirp"));
const getDataDir_1 = __importDefault(require("./getDataDir"));
exports.default = async (accountId) => {
    const dataDir = getDataDir_1.default(accountId);
    await mkdirp_1.default(dataDir);
    return dataDir;
};
//# sourceMappingURL=createDataDir.js.map