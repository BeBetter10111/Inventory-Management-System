import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/userService.js'

export default function NewPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    await userService.updatePassword(formData.password);

    navigate('/login');
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Resetting your password</h2>
          <p className="form-description">Enter your new password below to proceed</p>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create new password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
