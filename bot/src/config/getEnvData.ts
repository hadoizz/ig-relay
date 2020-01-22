const login = process.env.LOGIN 
  ? process.env.LOGIN 
  : 'jaca7_'

const password = process.env.PASSWORD 
  ? process.env.PASSWORD 
  : 'Panasonic7'

const controlled = process.env.CONTROLLED === '1'

const headless = process.env.HEADLESS === '1'

const production = process.env.NODE_ENV === 'production'

const cookies = process.env.COOKIES 
  ? JSON.parse(process.env.COOKIES) 
  : production
    ? {}
    : process.argv[2]
      ? { sessionid: process.argv[2] }
      : {}

export default () => ({
  login,
  password,
  controlled,
  headless,
  production,
  cookies
})