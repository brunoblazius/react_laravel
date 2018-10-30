import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventsList extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    axios.get('/api/events').then(response => {
      this.setState({
        events: response.data
      })
    })
  }

  render () {
    const { events } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Todos os Eventos</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                  Novo Evento
                </Link>
                <ul className='list-group list-group-flush'>
                  {events.map(event => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/${event.id}`}
                      key={event.id}
                    >
                      {event.name}
                      <span className='badge badge-primary badge-pill'>
                        {event.tickets_count}
                      </span>
                    </Link>
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

export default EventsList
