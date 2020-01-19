import { useState, useCallback } from 'react'
import { TextField, Typography, Button, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import withBotLayout from '../../components/withBotLayout'
import getJobs, { Job } from '../../utils/api/getJobs'
import updateJob from '../../api/jobs/update'
import deleteJob from '../../api/jobs/delete'
import createJob from '../../api/jobs/create'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  accountId: state.account.accountId
})

const CreateJob = connect(mapStateToProps)(({ accountId, open, handleExit }: { accountId: number, open: boolean, handleExit: (any) => void }) => {
  const [state, setState] = useState({ cron: '', maxDelaySeconds: 0, supervisor: '', supervisorPayload: '' })

  const update = (key: keyof Job) => ({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    }))

  return (
    <Dialog open={open} onClose={handleExit}>
      <DialogTitle>Create new job</DialogTitle>
      <DialogContent>
        <TextField label="cron" value={state.cron} onChange={update('cron')} />
        <TextField label="maximum delay seconds" type="number" inputProps={{ min: "0" }} value={state.maxDelaySeconds} onChange={update('maxDelaySeconds')} />
        <br />
        <TextField label="supervisor" value={state.supervisor} onChange={update('supervisor')} />
        <TextField label="payload" value={state.supervisorPayload} onChange={update('supervisorPayload')} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => createJob(accountId, state)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
})

const JobForm = ({ index, job }: { index: number, job: Job }) => {
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
        <div style={{ float: 'right' }}>
          <Button color="secondary" variant="contained" size="small" onClick={() => deleteJob(job)} style={{ marginRight: '0.5rem' }}>
            Delete
          </Button>
          <Button color="secondary" variant="contained" size="small" type="submit">
            Save changes
          </Button>
        </div>
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
  const [createJobDialog, setCreateJobDialog] = useState(false)

  const toggleJobDialog = () => 
    setCreateJobDialog(createJobDialog => !createJobDialog)

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
      <CreateJob open={createJobDialog} handleExit={toggleJobDialog} />
      {jobs.map((job, index) => (
        <JobForm 
          index={index}
          job={job}
          key={index}
        />
      ))}
      <br />
      <Button color="primary" variant="contained" onClick={toggleJobDialog}>Create job</Button>
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