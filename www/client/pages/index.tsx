import { withAuthSync } from '../utils/auth'
import Router from 'next/router'

const Index = () => null

Index.getInitialProps = ctx => {
  process.browser
    ? Router.push('/bot')
    : ctx.res.writeHead(302, { Location: '/bot' }).end()
}

export default withAuthSync(Index)
