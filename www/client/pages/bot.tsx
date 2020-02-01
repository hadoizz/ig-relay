import { useState, useCallback, useEffect } from 'react'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { Button, Menu, MenuItem, Typography, ListItem, ListItemText, List, ListItemIcon } from '@material-ui/core'
import Layout from '../components/Layout'
import getAccounts from '../utils/api/getAccounts'
import redirectOnError from '../utils/redirectOnError'
import { Card, CardContent, Grid } from '@material-ui/core'
import { FormatListBulletedOutlined, TrendingUpOutlined } from '@material-ui/icons'
import { connect } from 'react-redux'
import { Account } from '../types/Account'
import Index from '../components/Bot/Index'
import Logs from '../components/Bot/Logs'

const tabs = [{
  name: 'Jobs',
  icon: <TrendingUpOutlined />,
  getContent: (props?: any) => <Index {...props} />
}, {
  name: 'Logs',
  icon: <FormatListBulletedOutlined />,
  getContent: (props?: any) => <Logs {...props} />
}]

const mapStateToProps = state => ({ 
  currentAccount: state.bot.currentAccount 
})

const mapDispatchToProps = dispatch => ({
  setCurrentAccount: account => 
    dispatch({ 
      type: 'setCurrentAccount', 
      payload: account
    })
})

const Bot = connect(mapStateToProps, mapDispatchToProps)(({ currentAccount, accounts, tab, setCurrentAccount }: { currentAccount: Account, accounts: Account[], setCurrentAccount: Function, tab: number }) => {
  const [tabIndex, changeTabIndex] = useState(tab)

  const changeTab = (index: number) => () => {
    if(index === tabIndex)
      return

    changeTabIndex(index)
    cookie.set('tab', index)
  }

  const changeAccount = (accountId: number) => useCallback(() => {
    setCurrentAccount(accounts.find(account => account.accountId === accountId))
    closeMenu()
    cookie.set('accountId', accountId, { expires: 365 })
  }, [])

  const [menuElement, setMenuElement] = useState(null)
  const openMenu = useCallback(event => setMenuElement(event.currentTarget), [])
  const closeMenu = useCallback(() => setMenuElement(null), [])

  const menu = (
    <>
      <Button aria-controls="accounts-menu" aria-haspopup="true" onClick={openMenu}>
      {
        currentAccount.login
      }
      </Button>
      <Menu id="accounts-menu" anchorEl={menuElement} keepMounted open={Boolean(menuElement)} onClose={closeMenu}>
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
            {tabs.map(({ name, icon }, index) =>
              <ListItem button selected={index === tabIndex} onClick={changeTab(index)} key={index}>
                <ListItemIcon children={icon} />
                <ListItemText primary={name} />
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                { tabs[tabIndex].name }
              </Typography>
              { tabs[tabIndex].getContent() }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
})

//@ts-ignore
Bot.getInitialProps = async ctx => {
  const accounts = await getAccounts(ctx)
  if(accounts === null){
    redirectOnError(ctx)

    return { 
      accounts: [],
      tab: 0
    }
  }

  const accountId = parseInt(nextCookie(ctx).accountId)

  //@ts-ignore
  const account = (accountId && accounts.find(account => account.accountId === accountId)) || accounts[0]

  ctx.store.dispatch({ 
    type: 'setCurrentAccount', 
    payload: account 
  })

  const tab = Number(nextCookie(ctx).tab) || 0

  return { 
    accounts,
    tab
  }
}

export default Bot