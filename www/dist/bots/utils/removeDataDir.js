"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsp = require('fs/promises');
async function removeDataDir(botId) {
    await fsp.rmdir(`${process.cwd()}/bots_data/${botId}`, { recursive: true });
}
exports.default = removeDataDir;
//# sourceMappingURL=removeDataDir.js.map