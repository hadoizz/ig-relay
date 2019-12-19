import Credentials from '../types/Credentials'
import getEnvData from './getEnvData'

const { login, password } = getEnvData()

if(!login)
  throw `process.env.LOGIN is not set`

if(!password)
  throw `process.env.PASSWORD is not set`
 
export default async (): Promise<Credentials> => ({
  login,
  password
}) 