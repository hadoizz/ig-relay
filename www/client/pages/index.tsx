import nextCookie from 'next-cookies'
import Layout from '../components/Layout'
import { withAuthSync } from '../utils/auth'
import redirectOnError from '../utils/redirectOnError'
import getServerHost from '../utils/getServerHost'
import { Card, CardContent } from '@material-ui/core'

interface Account {
  login: string
  accountId: number
}

const Index = ({ accounts }: { accounts: Account[] }) => {
  console.log(accounts)

  return (
    <Layout>
      <Card>
        <CardContent>
        {
          accounts.map(({ login, accountId }) =>
            <div key={accountId}>
            { login }
            </div>
          )
        }
        </CardContent>
      </Card>
    </Layout>
  )
}

Index.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/accounts'

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      return {
        accounts: await response.json()
      }
    } else {
      return await redirectOnError(ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx)
  }
}

//@ts-ignore
export default withAuthSync(Index)