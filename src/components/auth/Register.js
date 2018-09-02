import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import RegisterView from './RegisterView'
import * as userActions from '../../actions/user'
import mutations from '../../graphql/mutations'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  /*
  *  Function: handleInputChange
  *  e: event
  *  This function saves user input to local state
  */
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})

  /*
  * Function: handleRegister
  * Calls Amplify signUp function to register user
  * If successful, saves user to DynamoDB using GraphQL endpoint,
  * and navigates to the Pending component to display further instructions.
  */
  handleRegister = async () => {
    if (this.validate()) {
        try {
          await Auth.signUp({
          username: this.state.email,
            password: this.state.password,
            attributes: {
              name: this.state.name,
            }
          })
          await API.graphql(graphqlOperation(mutations.addUser, {username: this.state.email, name: this.state.name}))
          this.props.history.push('/pending')
        } catch(error){
          console.log(error)
          this.setState({error: true, message: error.message || 'An error occurred. Please try again.'})
        }
    }
  }

  /*
  * Process register on enter key
  */
  handleKeyPress = e => {
    if (e.key === 'Enter' || e.charCode ===13 ) {
        this.handleRegister()
    }
  }

  validate = () => {
      let valid = true
      let message = ''
      if (this.state.name.length === 0) {
          valid = false
          message = 'Name is required. '
      }
      if (this.state.email.length === 0) {
          valid = false
          message = `${message}Email is required. `
      }
      if (this.state.password.length < 8) {
          valid = false
          message = `${message}Password must be 8 characters. `
      }
      if (this.state.password !== this.state.confirmPassword) {
          valid = false
          message = `${message}Passwords must match. `
      }
      if (!valid)
        this.setState({ error: true, message })

      return valid
  }

  render() {
    return (
      <RegisterView
        handleInputChange={this.handleInputChange}
        handleRegister={this.handleRegister}
        handleKeyPress={this.handleKeyPress}
        error={this.state.error}
        message={this.state.message}
      />
    )
  }

}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default withRouter(connect(null, mapDispatchToProps)(Register))
