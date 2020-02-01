import { Typography, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    textAlign: 'center',
    margin: theme.spacing(1, 0),
    color: 'black',
    opacity: 0.4,
    userSelect: 'none'
  }
}))

export default () => {
  const classes = useStyles({})
  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1">
        InstaFeed &#128156; { new Date().getFullYear() }
      </Typography>
    </footer>
  )
}