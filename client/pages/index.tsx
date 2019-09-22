import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Security, TrendingUp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  logo: {
    display: 'flex',
    alignItems: 'center'
  }
})

export default () => {
  const classes = useStyles()

  return ( 
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Container>
            <div className={classes.logo}>
              <Typography variant="h3" className={classes.logo}>
                <TrendingUp />
              </Typography>
              <Typography variant="h6">
                Instarter
              </Typography>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <div>
        <Security />
      </div>
    </>
  )
}