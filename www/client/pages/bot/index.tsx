import { useState, useCallback } from 'react'
import { TextField, Typography, Button } from '@material-ui/core'
import withBotLayout from '../../components/withBotLayout'
import getJobs, { Job } from '../../utils/api/getJobs'

const Jobs = ({ jobs: fetchedJobs }: { jobs: Job[] }) => {
  const [jobs, setJobs] = useState(fetchedJobs)

  /**
   * When account is changed new jobs are fetched.
   * All jobs belongs to specific user, so job id's are user specific.
   */
  const wasAccountChanged = (jobs[0] || {}).jobId !== (fetchedJobs[0] || {}).jobId
  if(wasAccountChanged)
    setJobs(fetchedJobs)

  if(jobs === null)
    return 'Cannot fetch jobs'

  const updateJob = (jobId: number, key: string) => ({ target: { value } }) =>
    setJobs(jobs => {
      const _jobs = [...jobs]
      for(const job of _jobs){
        if(job.jobId !== jobId)
          continue
        job[key] = value
        break
      }
      return _jobs
    })

  return (
    <>    {
      jobs.map(({ jobId, cron, supervisor, supervisorPayload, maxDelaySeconds }, index) => (
        <form noValidate autoComplete="off" key={jobId}>
          <Typography variant="h6">
            #{ index + 1 }
            <Button color="secondary" variant="contained" size="small" style={{ float: 'right' }}>Save changes</Button>
          </Typography>
          <TextField label="cron" value={cron} onChange={updateJob(jobId, 'cron')} />
          <TextField label="maximum delay seconds" type="number" inputProps={{ min: "0" }} value={maxDelaySeconds} onChange={updateJob(jobId, 'maxDelaySeconds')} />
          <br />
          <TextField label="supervisor" value={supervisor} onChange={updateJob(jobId, 'supervisor')} />
          <TextField label="payload" value={supervisorPayload} onChange={updateJob(jobId, 'supervisorPayload')} />
        </form>
      ))
    }
      <br />
      <Button color="primary" variant="contained">Add job</Button>
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