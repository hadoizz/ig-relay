"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsp = require('fs/promises');
async function createDataDir(botId) {
    const path = `${process.cwd()}/bots_data/${botId}`;
    await fsp.mkdir(path, { recursive: true });
    return path;
}
exports.default = createDataDir;
//# sourceMappingURL=createDataDir.js.map