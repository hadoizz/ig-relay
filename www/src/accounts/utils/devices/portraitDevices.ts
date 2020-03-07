import { devices } from 'puppeteer-core'

const portraitDevices = Object.entries(devices)
  .filter(([name]) => isNaN(Number(name)))
  .filter(([, device]) => !device.viewport.isLandscape)
  .filter(([, device]) => device.viewport.width <= 450)
  .filter(([, device]) => device.viewport.height / device.viewport.width >= 2)
  .map(([name]) => name)

export default portraitDevices