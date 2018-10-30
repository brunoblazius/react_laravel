import axios from 'axios'
import React, { Component } from 'react'

class SingleEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: {},
      tickets: [],
      title: '',
      errors: []
    }
    this.handleMarkEventAsCompleted = this.handleMarkEventAsCompleted.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldChangeType = this.handleFieldChangeType.bind(this)
    this.handleAddNewTicket = this.handleAddNewTicket.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleFieldChange (event) {
      this.setState({
        title: event.target.value,
        
      })
    }

  handleFieldChangeType (event) {
    this.setState({
      type: event.target.value,
    })
  }  

    handleAddNewTicket (event) {
        event.preventDefault()

        const ticket = {
          title: this.state.title,
          type: this.state.type,
          event_id: this.state.events.id
        }

        axios.post('/api/tickets', ticket)
          .then(response => {
            // clear form input
            this.setState({
              title: '',
              type: ''
            })
            
            this.setState(prevState => ({
              tickets: prevState.tickets.concat(response.data)
            }))
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='invalid-feedback'>
            <strong>{this.state.errors[field][0]}</strong>
          </span>
        )
      }
    }

    handleMarkTicketAsCompleted (ticketId) {
      axios.put(`/api/tickets/${ticketId}`).then(response => {
        this.setState(prevState => ({
          tickets: prevState.tickets.filter(ticket => {
            return ticket.id !== ticketId
          })
        }))
      })
    }

  handleMarkEventAsCompleted () {
    const { history } = this.props

    axios.put(`/api/events/${this.state.events.id}`)
      .then(response => history.push('/'))
  }

  componentDidMount () {
    const eventsId = this.props.match.params.id

    axios.get(`/api/events/${eventsId}`).then(response => {
      this.setState({
        events: response.data,
        tickets: response.data.tickets
      })
    })
  }

  render () {
    const { events, tickets } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{events.name}</div>
              <div className='card-body'>
                <p>{events.description}</p>

                <button
                  className='btn btn-primary btn-sm'
                  onClick={this.handleMarkEventAsCompleted}
                >
                  Marcar Evento como Visto
                </button>

                <hr />

                <form onSubmit={this.handleAddNewTicket}>
                  <div className='input-group'>
                    <input
                      type='text'
                      name='title'
                      className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                      placeholder='Titulo do Ingresso'
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                    />
                    <input
                      type='text'
                      name='type'
                      className={`form-control ${this.hasErrorFor('type') ? 'is-invalid' : ''}`}
                      placeholder='Tipo do Ingresso'
                      value={this.state.type}
                      onChange={this.handleFieldChangeType}
                    />
                    <div className='input-group-append'>
                      <button className='btn btn-primary'>Adicionar</button>
                    </div>
                    {this.renderErrorFor('type')}
                    {this.renderErrorFor('title')}
                  </div>
                </form>


                <ul className='list-group mt-3'>
                  {tickets.map(ticket => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={ticket.id}
                    >
                      Titulo: {ticket.title} - Tipo Ingresso: {ticket.type}

                      <button
                        className='btn btn-primary btn-sm'
                        onClick={this.handleMarkTicketAsCompleted.bind(this,ticket.id)}
                      >
                        Marcar Ingresso
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleEvent
