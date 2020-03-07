"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = require("puppeteer-core");
const portraitDevices = Object.entries(puppeteer_core_1.devices)
    .filter(([name]) => isNaN(Number(name)))
    .filter(([, device]) => !device.viewport.isLandscape)
    .filter(([, device]) => device.viewport.width <= 450)
    .filter(([, device]) => device.viewport.height / device.viewport.width >= 2)
    .map(([name]) => name);
exports.default = portraitDevices;
//# sourceMappingURL=portraitDevices.js.map