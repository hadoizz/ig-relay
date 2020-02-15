import { withAuthSync } from '../utils/auth'
import getLoggedUser from '../utils/getLoggedUser'
import Layout from '../components/Layout'
import AddAccountDialog from '../components/AddAccountDialog'

const Profile = props => {
  const { username } = props

  return (
    <Layout>
      <h1>{username}</h1>
      <AddAccountDialog open={true} handleExit={() => {}} />
    </Layout>
  )
}

Profile.getInitialProps = getLoggedUser
export default withAuthSync(Profile)
