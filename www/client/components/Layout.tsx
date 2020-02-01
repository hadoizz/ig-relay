import { Container, makeStyles, Theme, CardContent, Grid, Typography, List, ListItem, CssBaseline, Menu, MenuItem, Button } from '@material-ui/core'
import AppBar from './Layout/AppBar'
import Footer from './Layout/Footer'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    '#__next': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
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
      {
        children
      }
      </Container>
      <div className={classes.spacer} />
      <Footer />
    </>
  )
}