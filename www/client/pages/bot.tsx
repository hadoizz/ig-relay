import { useState, useCallback, useEffect } from 'react'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { Button, Menu, MenuItem, Typography, ListItem, ListItemText, List, ListItemIcon, makeStyles, Theme, Divider } from '@material-ui/core'
import Layout from '../components/Layout'
import getAccounts from '../utils/api/getAccounts'
import redirectOnError from '../utils/redirectOnError'
import { Card, CardContent, Grid } from '@material-ui/core'
import { FormatListBulletedOutlined, TrendingUpOutlined, ThreeSixtyOutlined } from '@material-ui/icons'
import { connect } from 'react-redux'
import { Account } from '../types/Account'
import Index from '../components/Bot/Index'
import Logs from '../components/Bot/Logs'
import AddAccountDialog from '../components/AddAccountDialog'
import Test from '../components/Bot/Test'

const useStyles = makeStyles((theme: Theme) => ({
  menuRow: {
    display: 'flex',
    alignItems: 'center'
  },
  menuLabel: {
    marginRight: theme.spacing(1)
  }
}))

const tabs = [{
  name: 'Jobs',
  icon: <TrendingUpOutlined />,
  getContent: (props?: any) => <Index {...props} />
}, {
  name: 'Logs',
  icon: <FormatListBulletedOutlined />,
  getContent: (props?: any) => <Logs {...props} />
}, {
  name: 'Test',
  icon: <ThreeSixtyOutlined />,
  getContent: (props?: any) => <Test {...props} />
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

  const [addAccountDialog, setAddAccountDialog] = useState(false)
  const toggleAddAccountDialog = () =>
    setAddAccountDialog(value => !value)

  const classes = useStyles({})

  if(currentAccount === null)
    return <AddAccountDialog open={true} handleExit={() => {}} />

  return (
    <Layout>
      <AddAccountDialog open={addAccountDialog} handleExit={toggleAddAccountDialog} />
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs={12} md={4}>
          <div className={classes.menuRow}>
            <Typography variant="body1" className={classes.menuLabel}>Current account:</Typography>
            <Button color="primary" variant="contained" aria-controls="accounts-menu" aria-haspopup="true" onClick={openMenu}>
              {currentAccount.login}
            </Button>
            <Menu id="accounts-menu" anchorEl={menuElement} keepMounted open={Boolean(menuElement)} onClose={closeMenu}>
              {accounts.map(({ login, accountId }) =>
                <MenuItem key={accountId} onClick={changeAccount(accountId)} {...currentAccount.accountId === accountId && { selected: true }}>
                  {login} 
                </MenuItem>
              )}
              <hr />
              <MenuItem onClick={() => { closeMenu(); toggleAddAccountDialog() }}>
                Add account
              </MenuItem>
            </Menu>
          </div>
          <br />
          <Typography variant="h5" gutterBottom>Navigation</Typography>
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
              <Typography variant="h4" gutterBottom>
                { tabs[tabIndex].name }
              </Typography>
              <Divider variant="middle" />
              <br />
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

  if(accounts.length === 0)
    return {
      accounts: [],
      tab: 0
    }

  const accountId = Number(nextCookie(ctx).accountId)

  const account = (accountId && accounts.find(account => account.accountId === accountId)) || accounts[0]

  ctx.store.dispatch({ 
    type: 'setCurrentAccount', 
    payload: account 
  })

  const tab = Math.min(Number(nextCookie(ctx).tab) || 0, tabs.length - 1)

  return { 
    accounts,
    tab
  }
}

export default Bot