import { useState, useCallback, useEffect } from 'react'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { Paper, Button, Menu, MenuItem, Typography, ListItem, ListItemText, List, ListItemIcon, makeStyles, Theme, Divider, CardHeader, Tabs, Tab, Box, AppBar } from '@material-ui/core'
import Layout from '../components/Layout'
import getAccounts from '../utils/api/getAccounts'
import redirectOnError from '../utils/redirectOnError'
import { Card, CardContent, Grid } from '@material-ui/core'
import { FormatListBulletedOutlined, TrendingUpOutlined, ThreeSixtyOutlined, SettingsApplicationsOutlined, Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import { Account } from '../types/Account'
import Index from '../components/Bot/Index'
import Logs from '../components/Bot/Logs'
import AddAccountDialog from '../components/AddAccountDialog'
import Test from '../components/Bot/Test'
import Config from '../components/Bot/Config'
import withRestricted from '../utils/withRestricted'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',

    //hack for margins betweens lines
    marginBottom: -theme.spacing(1),
    '& > *': {
      marginBottom: theme.spacing(1)
    }
  },
  headerTitle: {
    flexGrow: 1,
    fontWeight: 300,
    marginLeft: theme.spacing(1)
  },
  /*menuRow: {
    display: 'flex',
    alignItems: 'center'
  },
  menuLabel: {
    display: 'inline',
    marginRight: theme.spacing(2)
  }*/
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
}, {
  name: 'Config',
  icon: <SettingsApplicationsOutlined />,
  getContent: (props?: any) => <Config {...props} />
}]

const mapStateToProps = state => ({ 
  currentAccount: state.bot.currentAccount 
})

const mapDispatchToProps = dispatch => ({
  setCurrentAccount: account => 
    dispatch({ type: 'setCurrentAccount',  payload: account })
})

const Bot = connect(mapStateToProps, mapDispatchToProps)(({ currentAccount, accounts, tab, setCurrentAccount }: { currentAccount: Account, accounts: Account[], setCurrentAccount: Function, tab: number }) => {
  const [tabIndex, setTabIndex] = useState(tab)

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
    return <AddAccountDialog open={true} handleExit={() => location.reload()} />

  return (
    <Layout>
      <AddAccountDialog open={addAccountDialog} handleExit={toggleAddAccountDialog} />
        <Paper elevation={1}>
          <AppBar position="static" color="default" elevation={2}>
            <Paper square elevation={3} color="default">
              <Box m={1}>
                <header className={classes.header}>
                  <Typography className={classes.headerTitle} variant="h6">Current account: {currentAccount.login}</Typography>
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
                </header>
              </Box>
            </Paper>
            <Tabs 
              indicatorColor="secondary"
              textColor="secondary"
              value={tabIndex} 
              onChange={(event, newValue) => setTabIndex(newValue)}
            >
              {tabs.map(({ name }) => <Tab label={name} />)}
            </Tabs>
          </AppBar>
          <Box p={3}>
            {tabs[tabIndex].getContent()}
          </Box>
        </Paper>
      {/*<Grid container direction="row-reverse" spacing={2}>
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
      </Grid>*/}
    </Layout>
  )
})

//@ts-ignore
Bot.getInitialProps = async ctx => {
  const accounts = await getAccounts(ctx)
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

export default withRestricted(Bot)