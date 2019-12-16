import fetch from '../fetch'
import { BotInfo } from '../../../types/BotInfo'

export default async (id: string) => {
  const body = await fetch(`/bots/${id}`)
  const { alive }: BotInfo = await body.json()
  return {
    alive
  }
}