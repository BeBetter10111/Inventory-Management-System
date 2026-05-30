import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authServices'
import { AuthContext } from '../context/AuthContext'

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    roleType: ''
  });

  const auth = useContext(AuthContext);

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

    const missingValue = Object.values(formData).find((value) => !value);

    if (missingValue) {
      alert('Please fill in required form!');
      return;
    }

    await auth.register(
      formData.username,
      formData.password,
      formData.fullName,
      formData.email,
      formData.phoneNumber,
      formData.roleType
    )

    // Any account must be approved by existing admin
    navigate('/approval');
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
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
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
              id="roleType"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
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
