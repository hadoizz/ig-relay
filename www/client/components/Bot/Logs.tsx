import { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, makeStyles, CircularProgress } from '@material-ui/core'
import getLogs from '../../api/logs/getLogs'
import getFollowedCounts from '../../api/logs/getFollowedCounts'
import {Account} from '../../types/Account'
import { connect } from 'react-redux'

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

const mapStateToProps = state => ({
  currentAccount: state.bot.currentAccount
})

export default connect(mapStateToProps)(({ currentAccount }: { currentAccount: Account }) => {
  const [logs, setLogs] = useState(null)
  useEffect(() => {
    getLogs(currentAccount.accountId).then(setLogs)
  }, [currentAccount.accountId])

  const [followedCounts, setFollowedCounts] = useState(null)
  useEffect(() => {
    getFollowedCounts(currentAccount.accountId).then(setFollowedCounts)
  }, [currentAccount.accountId])

  const classes = useStyles({})

  if(logs === null)
    return <CircularProgress />

  return (
    <>
      {followedCounts === null
        ? <Typography variant="body1" gutterBottom>Loading stats...</Typography>
        : followedCounts.map(({ count, unfollowed }, index) =>
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
})