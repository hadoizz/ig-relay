import { useState } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Container, Typography, makeStyles, Theme, IconButton, Hidden, Drawer, SwipeableDrawer, useTheme, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Menu, PhonelinkSetupOutlined, AccountCircleOutlined, ExitToAppOutlined, HomeOutlined } from '@material-ui/icons'
import logout from '../../utils/auth/logout'
import { connect } from 'react-redux'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'body': {
      backgroundColor: theme.palette.background.default
    }
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    margin: 'auto',
    maxWidth: 960,
    width: '100%',
    padding: `0 ${theme.spacing(4)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `0 ${theme.spacing(1)}px 0 ${theme.spacing(3)}px`
    },
    [theme.breakpoints.down('xs')]: {
      padding: `0 ${theme.spacing(1)}px 0 ${theme.spacing(2)}px`
    }
  },
  logo: {
    display: 'inline',
    background: `radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 55%, #d6249f 90%)`,
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.5rem'
    }
  },
  drawer: {
    width: drawerWidth
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}))

const mapStateToProps = state => ({
  logged: Boolean(state.user)
})

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => 
    dispatch({ type: 'logout' })
})

const AppBarComponent = ({ logged, dispatchLogout }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleDrawer = () =>
    setMobileDrawerOpen(mobileDrawerOpen => !mobileDrawerOpen)

  const _logout = () => {
    dispatchLogout()
    logout()
  }

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const classes = useStyles({})
  return (
    <AppBar position="fixed" color="primary" elevation={5}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h3" className={classes.logo}>
          <Link href="/">
            <a>
              IFeed
            </a>
          </Link>
        </Typography>
        <div className={classes.grow} />
        {logged && <>
          <Hidden implementation="css" mdUp>
            <IconButton onClick={toggleDrawer} color="secondary">
              <Menu />
            </IconButton>
          </Hidden>
          <Hidden smDown implementation="css">
            <Link href="/profile">
              <a>
                <IconButton color="secondary">
                  <AccountCircleOutlined />
                </IconButton>
              </a>
            </Link>
            <IconButton color="secondary" onClick={_logout}>
              <ExitToAppOutlined />
            </IconButton>
          </Hidden>
        </>}
        {logged || <>
          <Link href="/login">
            <a>
              <IconButton color="secondary">
                <AccountCircleOutlined />
              </IconButton>
            </a>
          </Link>
        </>}
      </Toolbar>
      { /* mobile drawer */ }
      {logged && <Hidden smUp implementation="css">
        <SwipeableDrawer anchor="right" open={mobileDrawerOpen} onOpen={toggleDrawer} onClose={toggleDrawer} className={classes.drawer} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
          <List className={classes.drawer}>
            <Link href="/bot">
              <a className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeOutlined color="secondary" />
                  </ListItemIcon>
                  <ListItemText>
                    Bot
                  </ListItemText>
                </ListItem>
              </a>
            </Link>
            <Link href="/profile">
              <a className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined color="secondary" />
                </ListItemIcon>
                <ListItemText>
                  My profile
                </ListItemText>
              </ListItem>
              </a>
            </Link>
            <ListItem button onClick={_logout}>
              <ListItemIcon>
                <ExitToAppOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText>
                Log out
              </ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </Hidden>}
    </AppBar>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent)