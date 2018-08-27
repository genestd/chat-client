import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Pending from './auth/Pending'
import FourOhFour from './FourOhFour'

class PublicApp extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/pending' component={Pending} />
          <Route path='*' component={Login} />
        </Switch>
      </div>
    )
  }
}
  

export default PublicApp