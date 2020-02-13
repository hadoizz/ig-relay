import { useState, useEffect, useCallback } from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { Account } from '../../types/Account'
import start from '../../api/bots/start'
import executeSupervisor from '../../api/bots/executeSupervisor'
import getSupervisors from '../../api/bots/getSupervisors'
import exit from '../../api/bots/exit'
import Streaming from '../Streaming'

const mapStateToProps = state => ({
  currentAccount: state.bot.currentAccount
})

enum States {
  Initial,
  Starting
}

export default connect(mapStateToProps)(({ currentAccount }: { currentAccount: Account }) => {
  const [bot, setBot] = useState<States | string>(States.Initial)
  const startBot = async () => {
    setBot(States.Starting)
    const id = await start(currentAccount.accountId)
    if(id)
      setBot(id)
  }

  console.log(bot)

  const [response, setResponse] = useState(null)
  const callSupervisor = async (botId: string, name: string, arity: number) => {
    const response = arity === 0
      ? await executeSupervisor(botId, name)
      : await executeSupervisor(botId, name, prompt('Parameter:'))

    if(response)
      setResponse(response)
  }

  const [supervisors, setSupervisors] = useState([])
  useEffect(() => {
    if(typeof bot === 'string'){
      getSupervisors(bot).then(setSupervisors)
    }
  }, [bot])

  useEffect(() => {
    setBot(States.Initial)
    setResponse(null)
    setSupervisors([])
  }, [currentAccount.accountId])

  const exitBot = () => {
    if(typeof bot !== 'string')
      return

    exit(bot)
    setBot(States.Initial)
    setResponse(null)
    setSupervisors([])
  }

  useEffect(() => {
    window.addEventListener('unload', exitBot)
    console.log(`window.addEventListener('unload', exitBot)`)
    return () => {
      exitBot()
      window.removeEventListener('unload', exitBot)
      console.log(`window.removeEventListener('unload', exitBot)`)
    }
  }, [currentAccount.accountId, bot])

  return (
    <div>
    {bot === States.Initial && <Button variant="contained" color="primary" onClick={startBot}>Odpalaj</Button>}
    {bot === States.Starting && <CircularProgress />}
    {typeof bot === 'string' && supervisors.length && (
      <>
        <Typography variant="h4" gutterBottom>Opcje</Typography>
        {Object.entries(
          supervisors.reduce((acc, { type, ...rest }) => {
            if (acc[type]) {
              acc[type].push(rest)
              return acc
            }

            acc[type] = [rest]
            return acc
          }, {})
        )
        .map(([type, supervisors]: [string, []]) =>
          <div key={type}>
            <Typography variant="subtitle2">{type}</Typography>
            {supervisors.map(({ name, title, arity }) =>
              <Button variant="contained" key={name} onClick={() => callSupervisor(bot, name, arity)} color="primary">{title}</Button>
            )}
          </div>
        )}
        <Streaming botId={bot} />
      </>
    )}
    <br />
    {response !== null && <Typography variant="h4">Response {response}</Typography>}
    </div>
  ) 
})