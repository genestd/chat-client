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
  
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})
  
  handleRegister = async () => {
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
    }catch(error){
      console.log(error)
      this.setState({error: true, message: error.message || 'An error occurred. Please try again.'})
    }
  }
  
  render() {
    return (
      <RegisterView 
        handleInputChange={this.handleInputChange}
        handleRegister={this.handleRegister}
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