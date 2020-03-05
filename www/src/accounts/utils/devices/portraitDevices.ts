import { devices } from 'puppeteer-core'

const portraitDevices = Object.entries(devices)
  .filter(([name]) => isNaN(Number(name)))
  .filter(([, device]) => !device.viewport.isLandscape)
  .filter(([, device]) => device.viewport.width <= 450)
  .map(([name]) => name)

export default portraitDevices