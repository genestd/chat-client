import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import LoginView from './LoginView'
import * as userActions from '../../actions/user'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})
  
  handleLogin = () => {
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
         this.props.actions.login(this.state.email)
         this.props.history.push('/home')
       })
     .catch(err => console.log(err))
  }
  
  render() {
    return (
      <LoginView 
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
      />
    )
  }
  
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default withRouter(connect(null, mapDispatchToProps)(Login))