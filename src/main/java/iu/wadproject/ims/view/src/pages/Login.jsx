import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', formData)
    const user = auth.login(formData.username, formData.password)

    if (user.status === "Pending") {
      console.log('Sign up attempt:', formData)
      navigate('/approval')
    } else if (user.role === "staff") {
      console.log ('Sign up attempt: ', formData)
      navigate('/staff')
    } else {
      console.log('Sign up attempt:', formData)
      navigate('/admin')
    }
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login to your account</h2>
          <p className="form-description">Enter your username or email below to login to your account</p>

          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-group-header">
              <label htmlFor="password">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className="forgot-password">Forgot your password?</a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <p className="auth-link">
            Don't have an account? <a onClick={() => navigate('/signup')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}
