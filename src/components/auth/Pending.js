import React from 'react'
import { Link } from 'react-router-dom'

const Pending = props => (
  <div className="login__container">
    <div className="login__pending">
        <h1>
            Almost done...
        </h1>
        <div className="login__pending-body">
            Thank you for registering.  An email has been sent to your account.  Please click the link to verify, and then proceed to <Link to="/login">Sign in</Link>
        </div>
    </div>
  </div>
)

export default Pending
