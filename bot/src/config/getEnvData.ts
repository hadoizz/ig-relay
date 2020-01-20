export default () => ({
  login: process.env.LOGIN ? process.env.LOGIN : 'jaca7_',
  password: process.env.PASSWORD ? process.env.PASSWORD : '',
  controlled: process.env.CONTROLLED === '1',
  headless: process.env.HEADLESS === '1',
  production: process.env.NODE_ENV === 'production'
})