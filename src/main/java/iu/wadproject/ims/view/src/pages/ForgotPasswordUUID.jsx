import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordUUID() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  
  // Generate a random UUID for demo purposes
  const uuid = 'de7f04b0-743c-44a9-80b6-46c5903221a'

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <div className="reset-form">
          <h2>Your UUID to Reset Password</h2>
          <p className="form-description">Copy the code below for the next step</p>

          <div className="uuid-box">
            <input
              type="text"
              value={uuid}
              readOnly
              className="uuid-input"
            />
            <button
              type="button"
              className="btn-copy"
              onClick={handleCopy}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/verify-uuid')}
          >
            Proceed to Next Step
          </button>

          <p className="auth-link">
            <a onClick={() => navigate('/login')}>Login</a> or <a onClick={() => navigate('/signup')}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
