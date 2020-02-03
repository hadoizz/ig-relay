import dotenv from 'dotenv'
import fs from 'fs'

export class ConfigService {
  private readonly env: { [key: string]: string };

  constructor(){
    const parsed = dotenv.parse(fs.readFileSync('.env'))
    Object.assign(process.env, parsed)
    this.env = process.env
  }

  get(key: string): string {
    return this.env[key]
  }

  isProduction(){
    return this.get('NODE_ENV') === 'production'
  }
}