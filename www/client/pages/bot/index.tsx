import { TextField } from '@material-ui/core'
import withBotLayout from '../../components/withBotLayout'
import getJobs, { Job } from '../../utils/api/getJobs'

const Jobs = ({ jobs }: { jobs: Job[] }) => {

  if(jobs === null)
    return 'Cannot fetch jobs'

  return (
    <>
    {
      jobs.map(({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds }) => (
        <div key={jobId}>
          <TextField label="cron" value={cron} />
          <TextField label="supervisor" value={supervisor} />
          <TextField label="payload" value={supervisorPayload} />
          <TextField label="maximum seconds delay" type="number" inputProps={{ min: "0" }} value={maxDelaySeconds} />
        </div>
      ))
    }
    </>
  )
}

Jobs.getInitialProps = async ctx => {
  return {
    jobs: await getJobs(ctx)
  }
}

//@ts-ignore
export default withBotLayout(Jobs)