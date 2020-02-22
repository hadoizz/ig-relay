import portraitDevices from './portraitDevices'
import random from 'random-int'

export default () =>
  portraitDevices[random(0, portraitDevices.length-1)]