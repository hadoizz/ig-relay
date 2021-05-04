"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsp = require('fs/promises');
async function removeDataDirs() {
    await fsp.rmdir(`${process.cwd()}/bots_data`, { recursive: true });
}
exports.default = removeDataDirs;
//# sourceMappingURL=removeDataDirs.js.map