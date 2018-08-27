import React from 'react'
import { Link } from 'react-router-dom'

const LoginView = props => (
  <div>
    <h1>Login</h1>
    <div>
      <div>
        <input type="text" id="email" placeholder="email" onChange={props.handleInputChange} />
      </div>
      <div>
        <input type="password" id="password" placeholder="password" onChange={props.handleInputChange} />
      </div>
      <button onClick={props.handleLogin}>Sign in</button>
      <div>
        Don't have an account? <Link to="/register">Create an account</Link>
      </div>
    </div>
  </div>
)

export default LoginView