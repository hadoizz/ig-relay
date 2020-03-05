import dotenv from 'dotenv'
import fs from 'fs'

export class ConfigService {
  private readonly env: { [key: string]: string } = {}

  constructor(){
    this.env = process.env

    fs.readFile('.env', (err, data) => {
      if(err)
        return

      const parsed = dotenv.parse(data)

      Object.entries(parsed).forEach(([key, value]) => {
        this.env[key] = value
        
        if(!Object.prototype.hasOwnProperty.call(process.env, key))
          process.env[key] = value
        else
          console.log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      })
    })
  }

  get(key: string): string {
    return this.env[key]
  }

  isProduction(){
    return this.get('NODE_ENV') === 'production'
  }
}