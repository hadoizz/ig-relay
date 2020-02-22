import { devices } from 'puppeteer-core'

const portraitDevices = Object.entries(devices)
  .filter(([name, device]) => isNaN(Number(name)) && !device.viewport.isLandscape)
  .map(([name]) => name)

export default portraitDevices