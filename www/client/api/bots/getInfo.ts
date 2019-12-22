import fetch from '../fetch'

export default async (id: string) => {
  const body = await fetch(`/bots/${id}`)
  const { alive } = await body.json()
  return {
    alive
  }
}