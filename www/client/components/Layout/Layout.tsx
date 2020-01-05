import { Container, makeStyles, Theme, CardContent, Grid, Typography, List, ListItem, CssBaseline, Menu, MenuItem, Button } from '@material-ui/core'
import AppBar from './AppBar'
import Card from './Card'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
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

/*export default ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles({})
  return (
    <>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="md" className={classes.main}>
        <Grid container spacing={2} direction="row-reverse">
          <Grid xs={12} md={4} item>
            <Typography variant="body2" gutterBottom>
              Instagram account:
              <Button size="small" aria-controls="accounts" aria-haspopup="true" onClick={handleClick}>
                jaca7_
              </Button>
              <Menu id="accounts" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem selected>
                jaca7_ 
                </MenuItem>
              </Menu>
            </Typography>
            <List>
              <ListItem button selected>
                My jobs
              </ListItem>
              <ListItem button>
                Delayed posts
              </ListItem>
              <ListItem button>
                Logs
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} md={8} item>
            <Card>
              <Typography variant="body1" gutterBottom>
                My jobs
              </Typography>
              {
                children
              }
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}*/