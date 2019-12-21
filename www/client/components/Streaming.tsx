import { memo, useState, useEffect, useCallback } from 'react'
import { Button } from '@material-ui/core'
import fetchStartStreaming from '../api/streaming/startStreaming'
import fetchStopStreaming from '../api/streaming/stopStreaming'
import createEventSource from '../api/streaming/createEventSource'

export default memo(({ id }: { id: string }) => {
  const [data, setData] = useState(null)
  const [enabled, setEnabled] = useState(false)

  const updateData = useCallback(({ data }) => setData(data), [id])

  const startStreaming = useCallback(() => setEnabled(true), [id])
  
  const stopStreaming = useCallback(() => setEnabled(false), [id])

  useEffect(() => {
    if(!enabled)
      return
    
    const eventSource = createEventSource(id)
    eventSource.addEventListener('message', updateData)
    console.log(`eventSource.addEventListener('message')`)
    return () => {
      eventSource.removeEventListener('message', updateData)
      eventSource.close()
      console.log(`eventSource.removeEventListener('message')`)
    }
  }, [enabled, id])

  if(!enabled)
    return (
      <Button variant="contained" color="primary" onClick={startStreaming}>
        Pokaż
      </Button>
    )

  return (
    <>
      <picture>
        <img src={`data:image/png;base64,${data}`} style={{ objectFit: 'contain', width: '100%', maxHeight: '600px' }} />
      </picture>
      <Button variant="contained" color="primary" onClick={stopStreaming}>
        Ukryj
      </Button>
    </>
  )
})