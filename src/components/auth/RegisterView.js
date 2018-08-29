import React from 'react'
import { Link } from 'react-router-dom'

const RegisterView = props => (
  <div className="login__container">
    <div className="login__form">
      <h1>Register</h1>
      <div>
        Already have an account? <Link to="/login">Sign in.</Link>
      </div>
      <div>
        <input className="login__input" type="text" id="name" placeholder="name" onChange={props.handleInputChange} />
      </div>
      <div>
        <input className="login__input" type="text" id="email" placeholder="email" onChange={props.handleInputChange} />
      </div>
      <div>
        <input className="login__input" type="password" id="password" placeholder="password" onChange={props.handleInputChange} />
      </div>
      <div>
        <input className="login__input" type="password" id="confirmPassword" placeholder="confirm password" onChange={props.handleInputChange} />
      </div>
      <button className="login__button" onClick={props.handleRegister}>Register</button>
      <div className="login__text-error">
        { props.error && props.message}
      </div>
    </div>
  </div>
)

export default RegisterView
