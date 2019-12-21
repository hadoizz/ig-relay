import fetch from '../../fetch'

export default async () => {
  const body = await fetch(`/bots/dev`)
  const { alive, id }: { alive: boolean, id: string } = await body.json()
  return {
    alive,
    id
  }
}