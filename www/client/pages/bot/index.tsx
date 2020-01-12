import { TextField } from '@material-ui/core'
import withBotLayout from '../../components/withBotLayout'



const Jobs = ({ jobs }) => {

  return (
    <>
      <TextField label="cors" />
      <TextField label="supervisor" />
      <TextField label="payload" />
      <TextField label="maximum seconds delay" type="number" inputProps={{ min: "0" }} />
    </>
  )
}

Jobs.getInitialProps = async ctx => {

  return {
    jobs: []
  }
}

export default withBotLayout(Jobs)