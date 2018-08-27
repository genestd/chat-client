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

  /*
  *  Function: handleInputChange
  *  e: event
  *  This function saves user input to local state
  */
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})

  /*
  *  Function: handleLogin
  *  Calls Amplify function to log in with email/password from state
  *  If successful, gets user details using AppSync GraphQL endpoint,
  *  set redux loggedIn to true and navigates to the Home component
  */
  handleLogin = async () => {
    try {
      await Auth.signIn(this.state.email, this.state.password)
      const result = await API.graphql(graphqlOperation(queries.GetUserByEmail, { username: this.state.email}))
      this.props.actions.login(this.state.email, result.data.getUsers.name, result.data.getUsers.conversations)
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
