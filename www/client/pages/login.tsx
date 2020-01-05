import { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import fetch from 'isomorphic-unfetch'
import { login } from '../utils/auth'
import getServerHost from '../utils/getServerHost'
import Layout from '../components/Layout'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
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
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <TextField label="username" value={username} onChange={({ target: { value } }) => setUsername(value)} />
        <TextField label="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
        <Button type="submit">Log in</Button>
      </form>
    </Layout>
  )
}