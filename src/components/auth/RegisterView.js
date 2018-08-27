import React from 'react'
import { Link } from 'react-router-dom'

const RegisterView = props => (
  <div>
    <h1>Login</h1>
    <div>
      <div>
        <input type="text" id="name" placeholder="name" onChange={props.handleInputChange} />
      </div>
      <div>
        <input type="text" id="email" placeholder="email" onChange={props.handleInputChange} />
      </div>
      <div>
        <input type="password" id="password" placeholder="password" onChange={props.handleInputChange} />
      </div>
      <div>
        <input type="password" id="confirmPassword" placeholder="confirm password" onChange={props.handleInputChange} />
      </div>
      <button onClick={props.handleRegister}>Register</button>
      <div>
        Already have an account? <Link to="/login">Sign in.</Link>
      </div>
    </div>
  </div>
)

export default RegisterView
