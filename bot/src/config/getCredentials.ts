import Credentials from '../types/Credentials'
import getEnvData from './getEnvData'

const { login, password, controlled } = getEnvData()

if(controlled && !login)
  throw `process.env.LOGIN is not set`

if(controlled && !password)
  throw `process.env.PASSWORD is not set`
 
export default (): Credentials => ({
  login,
  password
}) 