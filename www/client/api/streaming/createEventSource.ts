import getServerHost from '../../utils/getServerHost'

export default (id: string) =>
  new EventSource(`${getServerHost()}/streaming/${id}`)