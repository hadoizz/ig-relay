import { useState } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Container, Typography, makeStyles, Theme, IconButton, Hidden, Drawer, SwipeableDrawer, useTheme, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Menu, PhonelinkSetupOutlined, AccountCircleOutlined, ExitToAppOutlined, HomeOutlined } from '@material-ui/icons'
import { logout } from '../../utils/auth'

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
      padding: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      padding: 'unset'
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
  },
  burgerIcon: {
    color: '#fd5949'
  }
}))


export default () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleDrawer = () =>
    setMobileDrawerOpen(mobileDrawerOpen => !mobileDrawerOpen)

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const classes = useStyles({})
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar className={classes.toolbar}>
        <Hidden implementation="css" mdUp>
          <IconButton onClick={toggleDrawer}>
            <Menu className={classes.burgerIcon} />
          </IconButton>
        </Hidden>
        <Typography variant="h3" className={classes.logo}>
          <Link href="/">
            <a>
              IFeed
            </a>
          </Link>
        </Typography>
        <div className={classes.grow} />
        <Hidden smDown implementation="css">
          <Link href="/dev">
            <a>
              <IconButton color="secondary">
                <PhonelinkSetupOutlined />
              </IconButton>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <IconButton color="secondary">
                <AccountCircleOutlined />
              </IconButton>
            </a>
          </Link>
          <IconButton color="secondary" onClick={logout}>
            <ExitToAppOutlined />
          </IconButton>
        </Hidden>
      </Toolbar>
      { /* mobile drawer */ }
      <Hidden smUp implementation="css">
        <SwipeableDrawer open={mobileDrawerOpen} onOpen={toggleDrawer} onClose={toggleDrawer} className={classes.drawer} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
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
            <Link href="/dev">
              <a className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <PhonelinkSetupOutlined color="secondary" />
                  </ListItemIcon>
                  <ListItemText>
                    Dev
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
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText>
                Log out
              </ListItemText>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </Hidden>
    </AppBar>
  )
}