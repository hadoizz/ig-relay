const fsp = require('fs/promises');

export default async function removeDataDir(botId: string) {
  await fsp.rmdir(`${process.cwd()}/bots_data/${botId}`, { recursive: true });
}
