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
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const fork_with_emitter_1 = require("fork-with-emitter");
const stringio_1 = require("@rauschma/stringio");
const createBot = async (cookies = {}, beforeLoad) => {
    const bot = fork_with_emitter_1.createSlave('app.js', {
        cwd: path_1.resolve('../bot/dist/'),
        env: {
            HEADLESS: '1',
            CONTROLLED: '1',
            COOKIES: JSON.stringify(cookies)
        }
    });
    if (beforeLoad !== undefined)
        beforeLoad(bot);
    (async () => {
        var e_1, _a;
        try {
            for (var _b = __asyncValues(stringio_1.chunksToLinesAsync(bot.fork.stdout)), _c; _c = await _b.next(), !_c.done;) {
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
            for (var _b = __asyncValues(stringio_1.chunksToLinesAsync(bot.fork.stderr)), _c; _c = await _b.next(), !_c.done;) {
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
    await bot.request('start', null, 120);
    const startedAt = +new Date;
    return {
        info: {
            startedAt
        },
        slave: bot,
        exit() {
            bot.emit('exit');
        },
        async executeSupervisor(executeSupervisorCommand) {
            try {
                return await bot.request('executeSupervisor', executeSupervisorCommand, 60 * 30);
            }
            catch (error) {
                throw new Error(error);
            }
        },
        async getSupervisors() {
            return bot.request('getSupervisors');
        }
    };
};
exports.default = createBot;
//# sourceMappingURL=createBot.js.map