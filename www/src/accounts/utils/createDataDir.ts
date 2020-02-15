import mkdirp from 'mkdirp'
import getDataDir from './getDataDir'

export default async (accountId: number) => {
  const dataDir = getDataDir(accountId)
  await mkdirp(dataDir)
  return dataDir
}