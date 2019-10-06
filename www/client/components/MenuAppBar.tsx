import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core'
import Logo from '@material-ui/icons/ArrowUpward'

export default () => {

  return (
    <>
      <AppBar position="static">
        <Container fixed>
          <Toolbar>
            <IconButton>
              <Logo />
            </IconButton>
            <Typography variant="h6">
              Insta
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}