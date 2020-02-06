import { DialogTitle, DialogContent, TextField, Typography, Button, DialogActions, DialogContentText, makeStyles, CircularProgress } from '@material-ui/core'
import { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react'
import Dialog from './Dialog'

const tv = (dispatch: (arg?: any) => any) => (event: ChangeEvent | InputEvent) =>
  void dispatch(
    ((event.target) as HTMLInputElement).value
  )

const handleSubmit = (dispatch: (arg?: any) => any) => (event: FormEvent) => {
  event.preventDefault()
  dispatch()
}

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

type Status = 'initial' | 'logging' | 'challenge' | 'added'

export default ({ open, handleExit }: { open: boolean, handleExit: () => void }) => {
  const [status, setStatus] = useState<Status>('initial')
  useEffect(() => setStatus('initial'), [])

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const logMe = useCallback(async () => {
    alert(login+password)

    setStatus('added')
  }, [login, password])

  const [code, setCode] = useState('')
  const challenge = useCallback(async () => {

    
  }, [code])

  const classes = useStyles({})
  return (
    <Dialog open={open} onClose={handleExit} maxWidth="xs" fullWidth={true}>
      {status === 'initial' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We do not store Instagram passwords.
            </DialogContentText>
            <form onSubmit={handleSubmit(logMe)} className={classes.form}>
              <TextField
                label="login"
                value={login}
                onChange={tv(setLogin)}
              />
              <TextField
                label="password"
                value={password}
                onChange={tv(setPassword)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={logMe}>Log me</Button>
          </DialogActions>
        </>
      )}
      {status === 'logging' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" disabled>Log me</Button>
          </DialogActions>
        </>
      )}
      {status === 'challenge' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Instagram sent authentication code to your e-mail.
            </DialogContentText>
            <form onSubmit={handleSubmit(challenge)} className={classes.form}>
              <TextField
                label="code"
                value={code}
                onChange={tv(setCode)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={challenge}>Enter my code</Button>
          </DialogActions>
        </>
      )}
      {status === 'added' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Logged to { login } account!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleExit}>Okay</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}