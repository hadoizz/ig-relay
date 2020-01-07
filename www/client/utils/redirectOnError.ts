import Router from 'next/router'

export default ctx =>
  process.browser
    ? Router.push('/login')
    : ctx.res.writeHead(302, { Location: '/login' }).end()
