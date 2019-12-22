export default () => ({
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
  controlled: process.env.CONTROLLED === '1' ? true : false,
  headless: process.env.HEADLESS === '1' ? true : false
})