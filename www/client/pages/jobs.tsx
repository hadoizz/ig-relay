import { Container, Typography, makeStyles, Theme, TextField, TextareaAutosize, Link, Button } from '@material-ui/core'
import { useState } from 'react'
import { isValidCron } from 'cron-validator'
import Layout from '../components/Layout'

export default () => {
  const [jobs, setJobs] = useState([{
    jobId: 0,
    cron: '0 * * * * *',
    evaluate: `console.log('job:', new Date().toLocaleString())`
  }])

  const updateJobData = jobId => prop => ({ target: { value } }) => {
    const newJobs = [...jobs]
    const job = newJobs.find(job => jobId === job.jobId)
    job[prop] = value
    setJobs(newJobs)
  }

  //isValidCron(value, { seconds: true, alias: true })

  const updateJob = jobId => () => {

  }

  return (
    <Layout>
      <form noValidate autoComplete="off">
        {
          jobs.map(({ cron, evaluate, jobId }) =>
            <div key={jobId} style={{ marginBottom: '32px' }}>
              <TextField label="CRON" value={cron} onChange={updateJobData(jobId)('cron')} inputProps={{ style: { fontFamily: 'Courier' } }} />
              <TextField label="Code" value={evaluate} onChange={updateJobData(jobId)('evaluate')} fullWidth inputProps={{ style: { fontFamily: 'Courier' } }} />
              <br /><br />
              <Button onClick={updateJob(jobId)} variant="contained" color="primary">Zapisz</Button>
            </div>
          )
        }
        <Button variant="contained" color="secondary">Dodaj</Button>
      </form>
    </Layout>
  )
}