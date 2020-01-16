import withBotLayout from '../../components/withBotLayout'
import { TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import getLogs, { Log } from '../../utils/api/getLogs'

const Logs = ({ logs }: { logs: Log[] }) => {
  if(logs === null)
    return 'Error'

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
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
          <TableRow key={index}>
            <TableCell>{ type }</TableCell>
            <TableCell>{ payload }</TableCell>
            <TableCell>{ new Date(createdAt).toLocaleString('en-GB') }</TableCell>
          </TableRow> 
        )}
      </TableBody>
    </Table>
  )
}

Logs.getInitialProps = async ctx => {
  return {
    logs: await getLogs(ctx)
  }
}

//@ts-ignore
export default withBotLayout(Logs)