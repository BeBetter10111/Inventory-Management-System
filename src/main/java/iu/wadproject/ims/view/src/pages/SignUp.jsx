import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authServices'
import { useAuth } from "../hooks/useAuth"

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // TODO: Add registration logic
    if (!formData.username || !formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.role) {
      alert('Please fill in all fields!')
      return
    }
    
    const payLoad = {
      userName: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      pw: formData.password,
      role: formData.role
    }
    auth.register(payLoad);
    
    if (formData.role === 'staff') {
      console.log('Sign up attempt:', formData)
      navigate('/approval')
    }
    if (formData.role === 'admin') {
      console.log('Sign up attempt:', formData)
      navigate('/admin')
    }
    
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign up for a new account</h2>
          <p className="form-description">Enter your information below to sign up</p>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Sign up</button>

          <p className="auth-link">
            Already have an account? <a onClick={() => navigate('/login')}>Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}
