import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid, Input, TextField, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Router from 'next/router'
import getSupervisors from '../api/bots/getSupervisors'
import executeSupervisor from '../api/bots/executeSupervisor'
import fetchStart from '../api/bots/dev/start'
import fetchExit from '../api/bots/exit'
import Streaming from '../components/Streaming'

import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../utils/auth'
import getServerHost from '../utils/getServerHost'
import Layout from '../components/Layout'

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

const ignoredSupervisorTypes = ['dev']

const Dev = ({ id: startingId, alive }: { id: string, alive: boolean }) => {
  const [botStatus, setBotStatus] = useState(alive ? BotStatus.On : BotStatus.Off)
  const [id, setId] = useState(startingId)
  const [supervisors, setSupervisors] = useState([])

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
    <Layout>
      <CssBaseline />
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
          {
            supervisors.length > 0 && (
              <>
                <Typography variant="h4" gutterBottom>Opcje</Typography>
                {
                  Object.entries(
                    supervisors.reduce((acc, { type, ...rest }) => {
                      if (ignoredSupervisorTypes.includes(type))
                        return acc
      
                      if (acc[type]) {
                        acc[type].push(rest)
                        return acc
                      }
      
                      acc[type] = [rest]
                      return acc
                    }, {})
                  )
                  .map(([type, supervisors]: [string, []]) =>
                    <div key={type}>
                      <Typography variant="subtitle2">{type}</Typography>
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
              </>
            )
          }
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
    </Layout>
  )
}

Dev.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/bots/dev'

  const redirectOnError = () =>
    process.browser
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })

    if(response.ok){
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

//@ts-ignore
export default withAuthSync(Dev)