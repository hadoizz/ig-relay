import { memo, useState, useEffect, useCallback } from 'react'
import createEventSource from '../api/streaming/createEventSource'

export default memo(({ botId, open = true }: { botId: string, open?: boolean }) => {
  const [data, setData] = useState(null)

  const updateData = useCallback(({ data }) => setData(data), [botId])

  useEffect(() => {
    if(!open)
      return
    
    const eventSource = createEventSource(botId)
    eventSource.addEventListener('message', updateData)
    console.log(`eventSource.addEventListener('message')`)
    return () => {
      eventSource.removeEventListener('message', updateData)
      eventSource.close()
      console.log(`eventSource.removeEventListener('message')`)
    }
  }, [botId, open])

  return open && <img src={`data:image/png;base64,${data}`} style={{ objectFit: 'contain', width: '100%', maxHeight: '600px' }} />
})