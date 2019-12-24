import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid, Input, TextField, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState, useEffect, useMemo, useCallback } from 'react'
import getSupervisors from '../api/bots/getSupervisors'
import executeSupervisor from '../api/bots/executeSupervisor'
import fetchStart from '../api/bots/dev/start'
import fetchStatus from '../api/bots/dev/fetchStatus'
import fetchExit from '../api/bots/exit'
import Streaming from '../components/Streaming'

const useStyles = makeStyles((theme: Theme) => ({
  button: { 
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  } 
}))

const createSupervisorExecutor = (id: string) =>
  ({ name, arity }: { name: string, arity: number }) =>
    () =>
      executeSupervisor(id, name, arity === 0 ? undefined : prompt('Podaj wartość'))
      .then((result: any) => result !== undefined && alert(result))

enum BotStatus {
  Starting = 'STARTING',
  On = 'ON',
  Exitting = 'EXITTING',
  Off = 'OFF'
}

const ignoredSupervisorTypes = ['dev', 'controllers']

export default () => {
  const [botStatus, setBotStatus] = useState(BotStatus.Starting)
  const [id, setId] = useState(null)
  const [supervisors, setSupervisors] = useState([])

  useEffect(() => void (async () => {
    const { alive, id } = await fetchStatus()
    if(alive){
      setBotStatus(BotStatus.On)
      setId(id)
      return
    }
    
    setBotStatus(BotStatus.Off)
  })(), [])

  //fetch supervisors if id is set
  useEffect(() => {
    if(id === null)
      return

    getSupervisors(id).then(setSupervisors)
  }, [id, botStatus])

  const start = useCallback(() => {
    setBotStatus(BotStatus.Starting)
    fetchStart()
      .then(setId)
      .then(() => setBotStatus(BotStatus.On))
  }, [])

  const exit = useCallback(() => {
    setBotStatus(BotStatus.Exitting)
    fetchExit(id)
      .then(() => setId(null))
      .then(() => setBotStatus(BotStatus.Off))
  }, [id])

  const supervisorExecutor = useMemo(() => createSupervisorExecutor(id), [id])
  const classes = useStyles({})
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Card>
        <CardContent>
          <Grid container spacing={2} direction="row-reverse">
            <Grid item xs={12} sm={4}>
            {
              id && (
                <>
                  <Typography variant="h4" gutterBottom>Podgląd</Typography>
                  <Streaming id={id} />
                </>
              )
            }
            </Grid> 
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>Opcje</Typography>
              {
                Object.entries(
                  supervisors.reduce((acc, { type, ...rest }) => {
                    if(ignoredSupervisorTypes.includes(type))
                      return acc
                      
                    if(acc[type]){
                      acc[type].push(rest)
                      return acc
                    }

                    acc[type] = [rest]
                    return acc
                  }, {}) 
                )
                .map(([ type, supervisors ]: [ string, [] ]) =>
                  <div key={type}>
                    <Typography variant="subtitle2">{ type }</Typography>
                    {
                      supervisors.map(({ name, title, arity }) =>
                        <Button variant="contained" key={name} onClick={supervisorExecutor({ name, arity })} color="primary" className={classes.button}>
                        {
                          title
                        }
                        </Button>
                      )
                    }
                  </div>
                )
              }
              <br />
              {
                (botStatus === BotStatus.On || botStatus === BotStatus.Exitting)
                  ? <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={exit} 
                      disabled={botStatus === BotStatus.Exitting}>
                        Wyłącz
                    </Button>
                  : <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={start} 
                      disabled={botStatus === BotStatus.Starting}>
                        Włącz
                    </Button>
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}