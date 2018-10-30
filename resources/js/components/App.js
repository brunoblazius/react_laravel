import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewEvent from './NewEvent'
import EventsList from './EventsList'
import SingleEvent from './SingleEvent'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={EventsList} />
            <Route path='/create' component={NewEvent} />
            <Route path='/:id' component={SingleEvent} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
