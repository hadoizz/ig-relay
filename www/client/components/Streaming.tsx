import { PureComponent } from 'react'

interface Props {
  id: string
}

export default class extends PureComponent<Props> {
  state = { data: null }
  
  eventSource

  handleUpdate = ({ data }) => this.setState({ data })
  
  componentDidMount(){
    this.eventSource = new EventSource(`http://localhost:8080/streaming/${this.props.id}`)
    this.eventSource.addEventListener('message', this.handleUpdate)
  }

  componentWillUnmount(){
    this.eventSource.removeEventListener('message', this.handleUpdate)
  }

  render(){
    const data = this.state.data

    if(data === null) 
      return null

    return (
      <picture>
        <img src={`data:image/png;base64,${data}`} />
      </picture>
    )
  }  
}