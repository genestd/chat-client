import React from 'react'
import { Link } from 'react-router-dom'

const Pending = props => (
  <div>
    Thank you for registering.  An email has been sent to your account.  Please click the link to verify, and then proceed to <Link to="/login">Sign in</Link>
  </div>
)

export default Pending