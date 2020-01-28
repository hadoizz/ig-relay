export interface Job {
  jobId: number
  cron: string
  supervisor: string
  supervisorPayload: string
  maxDelaySeconds: string
}