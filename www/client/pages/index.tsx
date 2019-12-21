import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid, Input, TextField, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import MessageIcon from '@material-ui/icons/Message'
import { useState, useEffect, useMemo, useCallback } from 'react'
import getSupervisors from '../api/bots/getSupervisors'
import executeSupervisor from '../api/bots/executeSupervisor'
import fetchStart from '../api/bots/dev/start'
import fetchIsAlive from '../api/bots/dev/isAlive'
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

type BotStatus = 'starting' | 'on' | 'exitting' | 'off'

export default () => {
  const [botStatus, setBotStatus]: [BotStatus, Function] = useState('starting')
  const [id, setId] = useState(null)
  const [supervisors, setSupervisors] = useState([])

  useEffect(() => void (async () => {
    const isAlive = await fetchIsAlive()
    if(isAlive)
      setBotStatus('on')
    else
      setBotStatus('off')
  })(), [])

  //fetch supervisors if id is set
  useEffect(() => void (id && getSupervisors(id).then(setSupervisors)), [id])

  const start = useCallback(() => {
    fetchStart()
  }, [])

  const exit = useCallback(() => {
    fetchExit(id)
  }, [id])

  const supervisorExecutor = useMemo(() => createSupervisorExecutor(id), [id])
  const classes = useStyles({})
  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4"gutterBottom >Streaming</Typography>
              {
                id && <Streaming id={id} />
              }
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>Opcje:</Typography>
              <p>
              {
                supervisors.map(({ name, title, arity }) =>
                  <Button variant="contained" key={name} onClick={supervisorExecutor({ name, arity })} color="primary" className={classes.button}>
                  {
                    title
                  }
                  </Button>
                )
              }
              </p>
              {
                /*(botStatus === 'on' || botStatus === 'exitting')
                  ? <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => exit(id)} 
                      disabled={botStatus === 'exitting'}>
                        Wyłącz
                    </Button>
                  : <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => start(id)} 
                      disabled={botStatus === 'exitting'}>
                        Wyłącz
                    </Button>*/
                
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}