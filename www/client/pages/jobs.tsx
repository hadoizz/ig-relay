import { Container, Typography, makeStyles, Theme, TextField, TextareaAutosize, Link, Button } from '@material-ui/core'
import { useState } from 'react'
import { isValidCron } from 'cron-validator'

const useStyles = makeStyles((theme: Theme) => ({
  cronLabels: {
    color: theme.palette.grey[500]
  }
}))

export default () => {
  const [cron, setCron] = useState('* * * * * *')
  const [cronError, setCronError] = useState(false)
  const [evaluate, setEvaluate] = useState('')

  const classes = useStyles({})

  const updateCron = ({ target: { value } }) => 
    setCron(value)

  const validateCron = ({ target: { value } }) =>
    setCronError(!isValidCron(value, { seconds: true, alias: true }))

  const onSubmit = event => {
    event.preventDefault()

    if(cronError)
      return

    
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Your jobs:</Typography>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <p>
          <Typography variant="h4" gutterBottom>Cron job</Typography>
          <TextField value={cron} autoFocus onChange={updateCron} onBlur={validateCron} label="cron" error={cronError} />
          <Typography variant="subtitle2" className={classes.cronLabels}>second - minute - hour - day (month) - month - day (week)</Typography>
        </p>
        <Link href="https://crontab.guru" target="__blank" variant="h5">
          Simulator 
        </Link>
        <p>
          <Typography variant="h4" gutterBottom>Code</Typography>
          <TextareaAutosize onChange={({ target: { value } }) => setEvaluate(value)} />
        </p>
        <Button type="submit" variant="contained" color="inherit">
          Add
        </Button>
      </form>
    </Container>
  )
}