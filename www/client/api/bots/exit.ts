import fetch from '../fetch'

export default async (id: string) => {
  await fetch(`/bots/${id}/exit`)
}