import { Container, makeStyles, Theme, CardContent, Grid, Typography, List, ListItem, CssBaseline, Menu, MenuItem, Button } from '@material-ui/core'
import AppBar from './Layout/AppBar'
import Footer from './Layout/Footer'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    //for footer
    'html, body, #__next':{
      width: '100%',
      height: '100%'
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
    },
    //scrollbar
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  main: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  spacer: {
    flex: 1
  }
}))

export default ({ children }) => {

  const classes = useStyles({})
  return (
    <>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="md" className={classes.main}>
        {children}
      </Container>
      <div className={classes.spacer} />
      <Footer />
    </>
  )
}