import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid, Input, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import MessageIcon from '@material-ui/icons/Message'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import getServerUrl from '../config/getServerUrl'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },  
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  runButton: {
    display: 'block',
    margin: theme.spacing(2, 0, 2)
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(1)
  },
  listButton: {
    marginBottom: theme.spacing(1)
  },
  form: {
    display: 'inline-block'
  }
}))

enum BotStatus {
  Stopped,
  Running,
  Starting,
  NotChecked
}

export default () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [botStatus, setBotStatus] = useState(BotStatus.NotChecked)
  const [supervisors, setSupervisors] = useState([])
  const classes = useStyles({})

  useEffect(() => {
    const checkBotStatus = async () => {
      const { running } = await (await fetch(`${getServerUrl()}/dev`)).json()
      setBotStatus(running
        ? BotStatus.Running
        : BotStatus.Stopped
      )
    }

    checkBotStatus()
  }, [])

  useEffect(() => {
    if(botStatus !== BotStatus.Running)
      return

    const updateSupervisors = async () => {
      try {
        setSupervisors(
          await (await fetch(`${getServerUrl()}/dev/supervisors`)).json()
        )
      } catch(error){
        return
      }
    }

    updateSupervisors()
  }, [botStatus])

  const startBot = async () => {
    setBotStatus(BotStatus.Starting)
    await fetch(`${getServerUrl()}/dev/start`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    setBotStatus(BotStatus.Running)
  }

  const exitBot = () => {
    fetch(`${getServerUrl()}/dev/exit`, { method: 'POST' })
    setBotStatus(BotStatus.Stopped)
  }

  const execute = ({ name, arity }: { name: string, arity: number }) => async () => {
    const payload = (() => {
      if(arity === 0)
        return undefined

      const arg = prompt('Podaj argument')
      if(Number.isNaN(Number(arg)))
        return arg 

      return parseInt(arg)
    })()

    const response = await fetch(`${getServerUrl()}/dev/execute`, {
      method: 'POST',
      body: JSON.stringify({ type: name, payload }),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.text()
    if(result)
      alert(result)
  }

  return ( 
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Panel sterowania
          </Typography>
          {
            botStatus === BotStatus.NotChecked || botStatus === BotStatus.Starting
              ? (
                <Button variant="contained" color="primary" className={classes.runButton} disabled>
                  Uruchom bota
                </Button>
              ) : botStatus === BotStatus.Running
                ? (
                  <Button variant="contained" color="primary" className={classes.runButton} onClick={exitBot}>
                    Wyłącz bota
                  </Button>
                ) : (
                  <>
                    <p>
                      <TextField
                        label="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                      />
                      <TextField
                        type="password"
                        label="Hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </p>
                    <Button variant="contained" color="primary" className={classes.runButton} onClick={startBot}>
                      Uruchom bota
                    </Button>
                  </>
                )
          }
          {
            supervisors.length !== 0 && botStatus === BotStatus.Running && (
              <Grid container>
                <Grid item xs className={classes.list}>
                  <Typography variant="caption" gutterBottom>Opcje</Typography>
                  {
                    supervisors.map(({ name, title, arity }) =>
                      <Button 
                        variant="contained" 
                        className={classes.listButton} 
                        key={name} 
                        onClick={execute({ name, arity })}
                        {...arity !== 0 && { endIcon: <MessageIcon /> }}
                      >
                      {
                        title
                      }
                      </Button>
                    )
                  }
                </Grid>
              </Grid>
            )
          }
        </Paper>
      </Container>
    </>
  )
}