const fsp = require('fs/promises');

export default async function createDataDir(botId: string) {
  const path = `${process.cwd()}/bots_data/${botId}`;
  await fsp.mkdir(path, { recursive: true });
  return path;
}
