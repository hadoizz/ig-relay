"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const portraitDevices_1 = __importDefault(require("./portraitDevices"));
const random_int_1 = __importDefault(require("random-int"));
exports.default = () => portraitDevices_1.default[random_int_1.default(0, portraitDevices_1.default.length - 1)];
//# sourceMappingURL=getRandomDevice.js.map