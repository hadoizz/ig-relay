import withBotLayout from '../../components/withBotLayout'
import { TextField, Table, TableHead, TableRow, TableCell, TableBody, Typography, makeStyles } from '@material-ui/core'
import getLogs, { Log } from '../../utils/api/getLogs'
import getFollowedCounts, { FollowedCount } from '../../utils/api/getFollowedCounts'

const useStyles = makeStyles(() => ({
  row: {
    '& > *': {
      paddingLeft: '0',
      paddingRight: '6px'
    },
    '& > *:last-of-type': {
      paddingRight: '0'
    }
  }
}))

const Logs = ({ logs, followedCounts }: { logs: Log[], followedCounts: FollowedCount[] }) => {
  if(logs === null || followedCounts === null)
    return 'Error'

  const classes = useStyles({})
  return (
    <>
      {followedCounts.map(({ count, unfollowed }, index) =>
        <Typography variant="body1" gutterBottom key={index}>
          Total { unfollowed ? 'unfollowed' : 'followed' } count: { count }
        </Typography>
      )}
      <Table size="small">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell>
              type
            </TableCell>
            <TableCell>
              payload
            </TableCell>
            <TableCell>
              created at
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map(({ type, payload, createdAt }, index) =>
            <TableRow key={index} className={classes.row}>
              <TableCell>{ type }</TableCell>
              <TableCell>{ payload }</TableCell>
              <TableCell>{ new Date(createdAt).toLocaleString('en-GB') }</TableCell>
            </TableRow> 
          )}
        </TableBody>
      </Table>
    </>
  )
}

Logs.getInitialProps = async ctx => {
  const [logs, followedCounts] = await Promise.all([getLogs(ctx), getFollowedCounts(ctx)])
  return {
    logs,
    followedCounts
  }
}

//@ts-ignore
export default withBotLayout(Logs)