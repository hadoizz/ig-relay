import fetch from '../../fetch'

export default async () => {
  const body = await fetch(`/bots/dev`)
  const { id } = await body.json()
  return id
}