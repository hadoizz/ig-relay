import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { Button, Menu, MenuItem, Typography, ListItem, ListItemText, List, ListItemIcon } from '@material-ui/core'
import Layout from './Layout'
import getAccounts from '../utils/api/getAccounts'
import redirectOnError from '../utils/redirectOnError'
import { Card, CardContent, Grid } from '@material-ui/core'
import { FormatListBulletedOutlined, TrendingUpOutlined } from '@material-ui/icons'
import { NextPage } from 'next'
import { connect } from 'react-redux'

const routes = [{
  name: 'Jobs',
  route: '/bot',
  icon: <TrendingUpOutlined />
}, {
  name: 'Logs',
  route: '/bot/logs',
  icon: <FormatListBulletedOutlined />
}]

const mapStateToProps = state => ({ account: state.account })
const mapDispatchToProps = dispatch => ({
  setAccount: account => dispatch({ type: 'setAccount', payload: account })
})

const BotLayout = connect(mapStateToProps, mapDispatchToProps)(({ children, accounts, account, setAccount }) => {
  const { route: currentRoute, replace, pathname } = useRouter()

  const changeAccount = (accountId: number) => useCallback(() => {
    cookie.set('account', accountId)
    setAccount(accounts.find(account => account.accountId === accountId))
    handleCloseMenu()
    replace(pathname, pathname)
  }, [])

  const [menuEl, setMenuEl] = useState(null)
  const handleOpenMenu = useCallback(event =>
    setMenuEl(event.currentTarget)
  , [])
  const handleCloseMenu = useCallback(() =>
    setMenuEl(null)
  , [])
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
          <MenuItem key={accountId} onClick={changeAccount(accountId)}>
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
          <Typography variant="body1">Current account: { menu }</Typography>
          <List>
          {
            routes.map(({ name, route, icon }) =>
              <Link href={`${route}`} key={route}>
                <a style={{ color: 'unset', textDecoration: 'none' }}>
                  <ListItem button selected={route === currentRoute}>
                    <ListItemIcon children={icon} />
                    <ListItemText primary={name} />
                  </ListItem>
                </a>
              </Link>
            )
          }
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {
                  routes.find(({ route }) => route === currentRoute).name
                }
              </Typography>
              {
                children
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
})

export default (WrappedComponent: NextPage<any>) => {
  const Wrapper = ({ accounts, ...props }) =>
    <BotLayout accounts={accounts}>
      <WrappedComponent {...props} />
    </BotLayout>

  Wrapper.getInitialProps = async ctx => {
    const accounts = await getAccounts(ctx)
    if(accounts === null){
      redirectOnError(ctx)

      const componentProps = await (WrappedComponent.getInitialProps && WrappedComponent.getInitialProps(ctx))
      return { ...componentProps, accounts: [], account: null }
    }

    const accountId = parseInt(nextCookie(ctx).account)
    //@ts-ignore
    const account = (accountId && accounts.find(account => account.accountId === accountId)) || accounts[0]

    ctx.store.dispatch({ type: 'setAccount', payload: account })

    const componentProps = await (WrappedComponent.getInitialProps && WrappedComponent.getInitialProps(ctx))
    return { ...componentProps, accounts }
  }

  return Wrapper
}