"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringio_1 = require("@rauschma/stringio");
const chalk_1 = __importDefault(require("chalk"));
const fork_with_emitter_1 = require("fork-with-emitter");
const path_1 = require("path");
const createBot = async ({ dataDir, env = {}, cookies = {}, beforeLoad = (slave) => { }, }) => {
    const slave = fork_with_emitter_1.createSlave('app.js', {
        cwd: path_1.resolve('../bot/dist/'),
        env: Object.assign(Object.assign({ HEADLESS: '1' }, env), { CONTROLLED: '1', COOKIES: JSON.stringify(cookies), DATA_DIR: dataDir }),
    });
    beforeLoad(slave);
    (async () => {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(stringio_1.chunksToLinesAsync(slave.fork.stdout)), _c; _c = await _b.next(), !_c.done;) {
                const line = _c.value;
                console.log(chalk_1.default.yellow(stringio_1.chomp(line)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    })();
    (async () => {
        var e_2, _a;
        try {
            for (var _b = __asyncValues(stringio_1.chunksToLinesAsync(slave.fork.stderr)), _c; _c = await _b.next(), !_c.done;) {
                const line = _c.value;
                console.log(chalk_1.default.red(stringio_1.chomp(line)));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    })();
    await slave.request('start', null, 120);
    return {
        slave,
        exit() {
            slave.emit('exit');
        },
        async executeCommand(data) {
            return await slave.request('executeCommand', data, 60 * 30);
        },
        async getCommands() {
            return await slave.request('getCommands');
        },
    };
};
exports.default = createBot;
//# sourceMappingURL=createBot.js.map