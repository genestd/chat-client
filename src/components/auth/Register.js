import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Auth } from 'aws-amplify'
import RegisterView from './RegisterView'
import * as userActions from '../../actions/user'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  
  handleInputChange = e => this.setState({[e.target.id]: e.target.value})
  
  handleRegister = () => {
    Auth.signUp({
      username: this.state.email, 
      password: this.state.password,
      attributes: {
        name: this.state.name,
      }
    })
    .then(data => {
      console.log(data)
      this.props.actions.login(this.state.email)
    })
   .catch(err => console.log(err))
  }
  
  render() {
    return (
      <RegisterView 
        handleInputChange={this.handleInputChange}
        handleRegister={this.handleRegister}
      />
    )
  }
  
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
})

export default connect(null, mapDispatchToProps)(Register)