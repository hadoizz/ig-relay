import { getUrl } from '../fetch'

export default (id: string) =>
  new EventSource(getUrl(`/streaming/${id}`))