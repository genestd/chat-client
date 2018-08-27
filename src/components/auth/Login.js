import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import LoginView from './LoginView'
import * as userActions from '../../actions/user'
import queries from '../../graphql/queries'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    message: '',
  }
  
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})
  
  handleLogin = async () => {
    try {
      await Auth.signIn(this.state.email, this.state.password)
      const user = await API.graphql(graphqlOperation(queries.GetUserByEmail, { username: this.state.email}))
      this.props.actions.login(this.state.email, user.name, user.conversations)
      this.props.history.push('/home')
    } catch(error) {
      this.setState({error: true, message: error.message || 'An error occurred. Please try again.'})
    }
  }
  
  render() {
    return (
      <LoginView 
        handleInputChange={this.handleInputChange}
        handleLogin={this.handleLogin}
        error={this.state.error}
        message={this.state.message}
      />
    )
  }
  
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default withRouter(connect(null, mapDispatchToProps)(Login))