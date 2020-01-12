import { useState } from 'react'
import nextCookie from 'next-cookies'
import { Button, Menu, MenuItem, Typography, ListItem, ListItemText, List, ListItemIcon } from '@material-ui/core'
import Layout from '../components/Layout'
import { withAuthSync } from '../utils/auth'
import redirectOnError from '../utils/redirectOnError'
import getServerHost from '../utils/getServerHost'
import { Card, CardContent, Grid } from '@material-ui/core'
import { FormatListBulletedOutlined, TrendingUpOutlined } from '@material-ui/icons'

interface Account {
  login: string
  accountId: number
}

const Index = ({ accounts, account = accounts[0] }: { accounts: Account[], account: Account }) => {
  const [menuEl, setMenuEl] = useState(null)
  const handleOpenMenu = event =>
    setMenuEl(event.currentTarget)
  const handleCloseMenu = () =>
    setMenuEl(null)
  const menu = (
    <>
      <Button aria-controls="accounts-menu" aria-haspopup="true" onClick={handleOpenMenu}>
      {
        account.login
      }
      </Button>
      <Menu id="accounts-menu" anchorEl={menuEl} keepMounted open={Boolean(menuEl)} onClose={handleCloseMenu}>
      {
        accounts.map(({ login, accountId }) =>
          <MenuItem onClick={handleCloseMenu} key={accountId}>
          {
            login
          } 
          </MenuItem>
        )
      }
      </Menu>
    </>
  )

  return (
    <Layout>
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs={12} md={4}>
          Current account: { menu }
          <List>
            <ListItem button selected>
              <ListItemIcon>
                <TrendingUpOutlined />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FormatListBulletedOutlined />
              </ListItemIcon>
              <ListItemText primary="Logs" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Jobs</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

Index.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getServerHost(ctx.req) + '/accounts'

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
    if(response.ok){
      return {
        accounts: await response.json()
      }
    } else {
      return await redirectOnError(ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx)
  }
}

export default withAuthSync(Index)