const crypto = require('crypto')

/*
  returns 64 random chars
*/
async function getId(){
  return await new Promise<string>((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if(err)
        throw `Can't generate id!`
      
      resolve(`${buffer.toString('hex')},${(new Date).getTime().toString(36)}`);
    })
  })
}

export default getId