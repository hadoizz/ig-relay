import { Container, CssBaseline, Theme, Button, Typography, Avatar, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'

const controllers = [{
  title: 'Login',
  name: 'login'
}]

const services = [{
  title: 'Like',
  name: 'likePost'
}, {
  title: 'Scroll to next post',
  name: 'scrollToNextPost'
}, {
  title: 'Open likes dialog',
  name: 'openLikesDialog'
}, {
  title: 'Close dialog',
  name: 'closeDialog'
}]

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  runButton: {
    display: 'block',
    margin: theme.spacing(2, 0, 2),
    width: '100%'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(1)
  },
  listButton: {
    marginBottom: theme.spacing(1)
  }
}))

export default () => {
  const [active, setActive] = useState(null)
  const classes = useStyles({})

  useEffect(() => {
    const checkActive = async () => {
      setActive(
        await (await fetch('/active')).json()
      )
    }
    checkActive()
  }, [])

  const startBot = () => {
    fetch('/start', {
      method: 'POST'
    })
    setActive(true)
  }

  const exitBot = () => {
    run('exit')()
    setActive(false)
  }

  const run = (type: string, payload?: any) => () =>
    fetch('/execute', {
      method: 'POST',
      body: JSON.stringify({ type, payload }),
      headers: { 'Content-Type': 'application/json' }
    })

  return ( 
    <>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Panel sterowania
          </Typography>
          <div>
          {
            active === null
              ? (
                <Button variant="contained" color="primary" className={classes.runButton} disabled>
                  Uruchom bota
                </Button>
              ) : active
                ? (
                  <Button variant="contained" color="primary" className={classes.runButton} onClick={exitBot}>
                    Wyłącz bota
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" className={classes.runButton} onClick={startBot}>
                    Uruchom bota
                  </Button>
                )
          }
          </div>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.list}>
              <Typography variant="caption" gutterBottom>Controllers</Typography>
              {
                controllers.map(({ name, title }) =>
                  <Button variant="contained" className={classes.listButton} key={name} onClick={run(name)}>
                  {
                    title
                  }
                  </Button>
                )
              }
            </Grid>
            <Grid item xs={12} md={6} className={classes.list}>
              <Typography variant="caption" gutterBottom>Services</Typography>
              {
                services.map(({ name, title }) =>
                  <Button variant="contained" className={classes.listButton} key={name} onClick={run(name)}>
                  {
                    title
                  }
                  </Button>
                )
              }
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}