import { useState, useEffect, memo } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, makeStyles, CircularProgress, Tooltip } from '@material-ui/core'
import getLogs from '../../api/logs/getLogs'
import getFollowedCounts from '../../api/logs/getFollowedCounts'
import {Account} from '../../types/Account'
import { connect } from 'react-redux'
import ms from 'ms'

const getTimeAgo = (date: Date) => {
  const diff = Date.now() - date.getTime()
  return `${ms(diff, { long: true })} ago`
}

const useStyles = makeStyles(() => ({
  row: {
    '& > *': {
      paddingLeft: '0',
      paddingRight: '6px'
    },
    '& > *:last-of-type': {
      paddingRight: '0'
    }
  },
  breakAll: {
    wordBreak: 'break-all'
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  createdAt: {
    userSelect: 'none'
  }
}))

const mapStateToProps = state => ({
  currentAccount: state.bot.currentAccount
})

export default connect(mapStateToProps)(memo(({ currentAccount }: { currentAccount: Account }) => {
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
              <TableCell className={classes.breakAll}>{ payload }</TableCell>
              <TableCell className={classes.noWrap}>
                <Tooltip title={new Date(createdAt).toLocaleString('en-GB')} placement="right" enterTouchDelay={0}>
                  <span className={classes.createdAt}>
                    { getTimeAgo(new Date(createdAt)) }
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow> 
          )}
        </TableBody>
      </Table>
    </>
  )
}))