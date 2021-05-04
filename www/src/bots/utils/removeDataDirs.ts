const fsp = require('fs/promises');

export default async function removeDataDirs() {
  await fsp.rmdir(`${process.cwd()}/bots_data`, { recursive: true });
}
