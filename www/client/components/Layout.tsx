import { Container, makeStyles, Theme, CardContent, Grid, Typography, List, ListItem, CssBaseline, Menu, MenuItem, Button } from '@material-ui/core'
import AppBar from './Layout/AppBar'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    },
    marginBottom: theme.spacing(4)
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
    </>
  )
}