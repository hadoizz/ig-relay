import { useState } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Container, Typography, makeStyles, Theme, IconButton, Hidden, Drawer, SwipeableDrawer, useTheme, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Menu, PhonelinkSetupOutlined, AccountCircleOutlined, ExitToAppOutlined } from '@material-ui/icons'
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
  appBar: {
    backgroundColor: theme.palette.background.paper,
    //boxShadow: 'none',
    //borderBottom: '1px solid #ddd'
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
    background: `radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)`,
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  drawer: {
    width: drawerWidth
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}))

export default () => {
  const theme = useTheme()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleDrawer = () =>
    setMobileDrawerOpen(mobileDrawerOpen => !mobileDrawerOpen)

  const classes = useStyles({})
  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolbar}>
          <Hidden implementation="css" mdUp>
            <IconButton color="secondary" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          </Hidden>
          <Typography variant="h3" className={classes.logo}>
            <Link href="/">
              <a>
                InstaBot
              </a>
            </Link>
          </Typography>
          <div className={classes.grow} />
          <Hidden smDown implementation="css">
            <Link href="/dev">
              <a>
                <IconButton color="primary">
                  <PhonelinkSetupOutlined />
                </IconButton>
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <IconButton color="primary">
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
          <SwipeableDrawer open={mobileDrawerOpen} onOpen={() => setMobileDrawerOpen(true)} onClose={() => setMobileDrawerOpen(false)} className={classes.drawer}>
            <List className={classes.drawer}>
              <Link href="/dev">
                <a className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <PhonelinkSetupOutlined />
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
                    <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    My profile
                  </ListItemText>
                </ListItem>
                </a>
              </Link>
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <ExitToAppOutlined />
                </ListItemIcon>
                <ListItemText>
                  Log out
                </ListItemText>
              </ListItem>
            </List>
          </SwipeableDrawer>
        </Hidden>
      </AppBar>
    </>
  )
}