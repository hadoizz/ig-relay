module.exports = {
  publicRuntimeConfig: {
    CLIENT_HOST: process.env.CLIENT_HOST || 'localhost:3000',
    SERVER_HOST: process.env.SERVER_HOST || 'localhost:8080'
  }
}