import fetch from '../fetch'
import getServerHost from '../../utils/getServerHost'
import { Job } from '../../utils/api/getJobs'

export default async (job: Job) => {
  await fetch(`${getServerHost()}/jobs/${job.jobId}`, {
    method: 'DELETE'
  })
}