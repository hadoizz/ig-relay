import { DialogTitle, DialogContent, TextField, Typography, Button, DialogActions, DialogContentText, makeStyles, CircularProgress, Snackbar, FormHelperText, FormControl, FormLabel } from '@material-ui/core'
import { useState, ChangeEvent, FormEvent, useEffect, useRef, useCallback } from 'react'
import Dialog from './Dialog'
import createAccount from '../api/accounts/createAccount'
import start from '../api/bots/start'
import executeSupervisor from '../api/bots/executeSupervisor'
import exit from '../api/bots/exit'
import setLogged from '../api/accounts/setLogged'

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

type Status = 'unlogged' | 'logging' | 'wrong_credentials' | 'challenge' | 'challenging' | 'wrong_challenge_code' | 'success'

export default ({ open, handleExit }: { open: boolean, handleExit: () => void }) => {
  const [status, setStatus] = useState<Status>('unlogged')

  const savedAccountId = useRef(null)
  const savedBotId = useRef(null)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const log = async () => {
    let botId = savedBotId.current
    let accountId = savedAccountId.current

    setStatus('logging')
    if(botId === null){
      if(accountId === null){
        console.log('Creating account')
        accountId = await createAccount({ login })
        savedAccountId.current = accountId
        console.log(`Account ${accountId} created`)
      }

      console.log(`Starting bot`)
      botId = await start(accountId)
      savedBotId.current = botId
      console.log(`Bot ${botId} started`)
      window.addEventListener('unload', exitBot)
      console.log(`window.addEventListener('unload', exitBot)`)
    }

    console.log(`Logging with credentials { login: '${login}', password: '${password}' }`)
    const result = await executeSupervisor(botId, 'login', { login, password })
    console.log(`Result: ${result}`)

    if(result === 'error'){
      setStatus('wrong_credentials')
      return
    }

    if(result === 'challenge'){
      setStatus('challenge')
      return
    }

    if(result === 'success'){
      setStatus('success')
      setLogged(savedAccountId.current, login)
      return
    }

    throw `Unknown login result (${result})`
  }

  const [challengeCode, setChallengeCode] = useState('')

  const challenge = async () => {
    setStatus('challenging')
    console.log(`Passing challenge with code ${challengeCode}`)
    const result = await executeSupervisor(savedBotId.current, 'challenge', challengeCode)
    console.log(`Passed challenge with result ${result}`)
    
    if(result === 'error'){
      setStatus('wrong_challenge_code')
      return
    }

    if(result === 'success'){
      setStatus('success')
      setLogged(savedAccountId.current, login)
      return
    }

    throw `Unknown challenge result (${result})`
  }

  const exitBot = () => {
    exit(savedBotId.current)
    console.log(`Exitting bot ${savedBotId.current}`)

    setStatus('unlogged')
    savedBotId.current = null
    savedAccountId.current = null
    setLogin('')
    setPassword('')

    window.removeEventListener('unload', exitBot)
  }

  const handleClose = () => {
    const preventClose: Status[] = ['logging', 'challenging']
    if(preventClose.includes(status))
      return

    if(savedBotId.current !== null){
      exitBot()
    }

    handleExit()
  }

  const classes = useStyles({})
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      {(status === 'unlogged' || status === 'wrong_credentials') && (
        <form onSubmit={handleSubmit(log)}>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We do not store Instagram passwords.
            </DialogContentText>
            <FormControl error={status === 'wrong_credentials'} className={classes.form}>
              {status === 'wrong_credentials' && <FormLabel>Wrong password or login</FormLabel>}
              <TextField
                label="login"
                value={login}
                onChange={tv(setLogin)}
                inputProps={{ required: true }}
              />
              <TextField
                label="password"
                value={password}
                onChange={tv(setPassword)}
                inputProps={{ required: true }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">Log me</Button>
          </DialogActions>
        </form>
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
      {(status === 'challenge' || status === 'wrong_challenge_code') && (
        <form onSubmit={handleSubmit(challenge)}>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Instagram sent authentication code to your e-mail.
            </DialogContentText>
            <FormControl error={status === 'wrong_challenge_code'} className={classes.form}>
              {status === 'wrong_challenge_code' && <FormLabel>Wrong code</FormLabel>}
              <TextField
                label="code"
                value={challengeCode}
                onChange={tv(setChallengeCode)}
                required
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">Enter my code</Button>
          </DialogActions>
        </form>
      )}
      {status === 'challenging' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Instagram sent authentication code to your e-mail.
            </DialogContentText>
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" disabled>Enter my code</Button>
          </DialogActions>
        </>
      )}
      {status === 'success' && (
        <>
          <DialogTitle>Add Instagram account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Logged to { login } account!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>Okay</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}