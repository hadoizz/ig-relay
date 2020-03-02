import { useState, useCallback, useEffect } from 'react'
import { TextField, Typography, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from '@material-ui/core'
import getJobs from '../../api/jobs/get'
import updateJob from '../../api/jobs/update'
import deleteJob from '../../api/jobs/delete'
import createJob from '../../api/jobs/create'
import { connect } from 'react-redux'
import { Job } from '../../types/Job'
import { Account } from '../../types/Account'
import Dialog from '../Dialog'

const mapStateToProps = state => ({
  currentAccount: state.bot.currentAccount
})

const CreateJob = connect(mapStateToProps)(({ currentAccount, open, handleExit }: { currentAccount: Account, open: boolean, handleExit: (any) => void }) => {
  const [state, setState] = useState({ cron: '', maxDelaySeconds: 0, supervisor: '', supervisorPayload: '' })

  const update = (key: keyof Job) => ({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    }))

  const create = async () => {
    await createJob(currentAccount.accountId, state)
    location.reload()
  }

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
        <Button color="primary" onClick={create}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
})

const JobForm = ({ index, job }: { index: number, job: Job }) => {
  const [state, setState] = useState(job)

  useEffect(() => setState(job), [job])

  const handleSubmit = event => {
    event.preventDefault()

    updateJob(state)
  }

  const update = (key: keyof Job) => ({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    }))

  const del = async () => {
    await deleteJob(job)
    location.reload()
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <Typography variant="h6">
        #{ index + 1 }
        <div style={{ float: 'right' }}>
          <Button color="secondary" variant="contained" size="small" onClick={del} style={{ marginRight: '0.5rem' }}>
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

export default connect(mapStateToProps)(({ currentAccount }: { currentAccount: Account }) => {
  const [jobs, setJobs] = useState(null)
  useEffect(() => {
    getJobs(currentAccount.accountId).then(setJobs)
  }, [currentAccount.accountId])

  const [createJobDialog, setCreateJobDialog] = useState(false)
  const toggleJobDialog = () => setCreateJobDialog(createJobDialog => !createJobDialog)

  if(jobs === null)
    return <CircularProgress />

  return (
    <>
      <CreateJob open={createJobDialog} handleExit={toggleJobDialog} />
      {jobs.map((job, index) => (
        <JobForm 
          index={index}
          job={job}
          key={`${currentAccount}${index}`}
        />
      ))}
      <br />
      <Button color="primary" variant="contained" onClick={toggleJobDialog}>Create job</Button>
    </>
  )
})