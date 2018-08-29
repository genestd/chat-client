import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'

const LoginView = props => (
  <div className="login__container">
    <div className="login__form">
      <h1>Login</h1>
      
      <div className="login__text">
        Don't have an account? <Link to="/register">Create an account</Link>
      </div>
      <div>
        <input className="login__input" type="text" id="email" placeholder="email" onChange={props.handleInputChange} />
      </div>
      <div>
        <input className="login__input" type="password" id="password" placeholder="password" onChange={props.handleInputChange} />
      </div>
      <button className="login__button" onClick={props.handleLogin}>Sign in</button>
      <div className="login__text-error">
        {props.error && props.message}
      </div>
    </div>
  </div>
)

export default LoginView
