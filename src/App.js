import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PublicApp from './components/PublicApp'
import Home from './components/chat/Home'
import './App.css'

class App extends Component {
  render() {
    if (this.props.loggedIn) 
      return (
        <Home />
      )
    else 
      return (
        <PublicApp />
      )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
})

export default withRouter(connect(mapStateToProps)(App))