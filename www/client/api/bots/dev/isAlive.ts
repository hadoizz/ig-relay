import fetch from '../../fetch'

export default async () => {
  const body = await fetch(`/bots/dev`)
  const { alive } = await body.json()
  return alive === true
}