import { useState } from 'react'

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.oldPassword === formData.newPassword) {
      setError('New password must be different from old password')
      return
    }

    // TODO: Call API to change password
    console.log('Changing password')
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      {/* Modal Content */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Password</h2>
          <p>Enter your old password below</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter your old password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Create new password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="btn-primary">Update Password</button>
          <button type="button" className="btn-secondary" onClick={handleClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}
