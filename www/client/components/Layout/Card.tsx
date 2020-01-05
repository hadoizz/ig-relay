import { Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  card: {
    //boxShadow: 'none',
    //border: '1px solid #ddd'
  }
}))

export default ({ children }) => {
  const classes = useStyles({})
  return (
    <Card className={classes.card}>
      <CardContent>
      { children }
      </CardContent>
    </Card>
  ) 
}