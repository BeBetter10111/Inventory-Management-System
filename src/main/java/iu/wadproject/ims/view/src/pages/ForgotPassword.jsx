import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Call API to request password reset
    console.log('Reset password request for:', email)
    navigate('/reset-uuid')
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Resetting your password</h2>
          <p className="form-description">Enter your email below to reset your account's password</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Reset Password</button>

          <p className="auth-link">
            <a onClick={() => navigate('/login')}>Login</a> or <a onClick={() => navigate('/signup')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}
