import Credentials from '../types/Credentials'

const { 
  LOGIN: login, 
  PASSWORD: password
} = process.env

if(!login)
  throw `process.env.LOGIN is not set`

if(!password)
  throw `process.env.PASSWORD is not set`

export default async (): Promise<Credentials> => ({
  login,
  password
}) 