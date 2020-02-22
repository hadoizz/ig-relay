"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = require("puppeteer-core");
const portraitDevices = Object.entries(puppeteer_core_1.devices)
    .filter(([name, device]) => isNaN(Number(name)) && !device.viewport.isLandscape)
    .map(([name]) => name);
exports.default = portraitDevices;
//# sourceMappingURL=portraitDevices.js.map