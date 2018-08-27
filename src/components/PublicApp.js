import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import FourOhFour from './FourOhFour'

class PublicApp extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='*' component={Login} />
        </Switch>
      </div>
    )
  }
}
  

export default PublicApp