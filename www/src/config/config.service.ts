import dotenv from 'dotenv'
import fs from 'fs'

export class ConfigService {
  private readonly env: { [key: string]: string };

  constructor(){
    if(process.env.NODE_ENV === 'production'){
      this.env = process.env
      return 
    }

    this.env = dotenv.parse(fs.readFileSync('.env'))
  }

  get(key: string): string {
    return this.env[key]
  }
}