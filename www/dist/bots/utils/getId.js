"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
async function getId() {
    return await new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err)
                throw `Can't generate id!`;
            resolve(`${buffer.toString('hex')},${(new Date).getTime().toString(36)}`);
        });
    });
}
exports.default = getId;
//# sourceMappingURL=getId.js.map