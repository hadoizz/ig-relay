import Router from 'next/router'
import { Container, Typography, makeStyles, Theme, TextField, TextareaAutosize, Link, Button } from '@material-ui/core'
import { useState } from 'react'
import { isValidCron } from 'cron-validator'
import Layout from '../components/Layout'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../utils/auth'
import getServerHost from '../utils/getServerHost'
import getLoggedUser from '../utils/getLoggedUser'

const Jobs = ({ userId }) => {
  console.log(userId)

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

Jobs.getInitialProps = async ctx => {
  return await getLoggedUser(ctx)

  
}

export default withAuthSync(Jobs)