import rimraf from 'rimraf'
import getDataDir from './getDataDir'

export default (accountId: number) => {
  return new Promise(resolve => {
    const dataDir = getDataDir(accountId)
    rimraf(dataDir, resolve)
  })
}