const { exec } = require('child_process')
const { promisify } = require('util')

const pexec = promisify(exec)

;(async () => {
  await pexec(`cd ${__dirname}`)
  await pexec('cd ./build/www/client')
  await pexec('npm12 install')
  await pexec('npm12 start')
  await pexec('cd ..')
  await pexec('npm12 install')
  await pexec('npm12 start')
})()