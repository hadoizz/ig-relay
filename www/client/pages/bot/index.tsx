import { useState, useCallback } from 'react'
import { TextField, Typography, Button } from '@material-ui/core'
import withBotLayout from '../../components/withBotLayout'
import getJobs, { Job } from '../../utils/api/getJobs'
import updateJob from '../../api/jobs/update'

const JobForm = ({ index, job, handleSaveChanges }: { index: number, job: Job, handleSaveChanges: (any) => void }) => {
  const [state, setState] = useState(job)

  const handleSubmit = event => {
    event.preventDefault()

    updateJob(state)
  }

  const update = (key: keyof Job) => ({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    }))

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6">
        #{ index + 1 }
        <Button color="secondary" variant="contained" size="small" style={{ float: 'right' }} type="submit">
          Save changes
        </Button>
      </Typography>
      <TextField label="cron" value={state.cron} onChange={update('cron')} />
      <TextField label="maximum delay seconds" type="number" inputProps={{ min: "0" }} value={state.maxDelaySeconds} onChange={update('maxDelaySeconds')} />
      <br />
      <TextField label="supervisor" value={state.supervisor} onChange={update('supervisor')} />
      <TextField label="payload" value={state.supervisorPayload} onChange={update('supervisorPayload')} />
    </form>
  )
}

const Jobs = ({ jobs: fetchedJobs }: { jobs: Job[] }) => {
  const [jobs, setJobs] = useState(fetchedJobs)
  if(jobs === null)
    return 'Error'

  /**
   * When account is changed new jobs are fetched.
   * All jobs belongs to specific user, so job id's are user specific.
   */
  const wasAccountChanged = (jobs[0] || {}).jobId !== (fetchedJobs[0] || {}).jobId
  if(wasAccountChanged)
    setJobs(fetchedJobs)

  return (
    <>
      {jobs.map((job, index) => (
        <JobForm 
          index={index}
          job={job}
          handleSaveChanges={console.log} 
          key={index}
        />
      ))}
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