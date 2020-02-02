import { useState, useCallback } from 'react'
import { TextField, Button, Theme, makeStyles, Card, CardContent, Typography, Avatar } from '@material-ui/core'
import fetch from 'isomorphic-unfetch'
import { login } from '../utils/auth'
import getServerHost from '../utils/getServerHost'
import Layout from '../components/Layout'
import { LockOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 380,
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(async event => {
    event.preventDefault()

    try {
      const response = await fetch(`${getServerHost()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if(response.ok){
        const { access_token } = await response.json()
        await login(access_token)
      } else {
        console.log('Login failed.')
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }
  }, [username, password])

  const classes = useStyles({})
  return (
    <Layout>
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Avatar>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h3" className={classes.title}>Log in</Typography>
            <TextField label="username" value={username} onChange={({ target: { value } }) => setUsername(value)} />
            <TextField label="password" type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Log in</Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}