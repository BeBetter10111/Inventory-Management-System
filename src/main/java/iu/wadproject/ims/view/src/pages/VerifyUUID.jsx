import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyUUID() {
  const navigate = useNavigate()
  const [uuid, setUuid] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Call API to verify UUID
    console.log('Verifying UUID:', uuid)
    navigate('/new-password')
  }

  return (
    <div className="container auth-container">
      <div className="auth-box">
        <h1>Inventory Management System</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Verify your UUID</h2>
          <p className="form-description">Enter your UUID you received earlier to verify</p>

          <div className="form-group">
            <label htmlFor="uuid">UUID</label>
            <input
              type="text"
              id="uuid"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Paste your UUID here"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Verify</button>

          <p className="auth-link">
            <a onClick={() => navigate('/login')}>Login</a> or <a onClick={() => navigate('/signup')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}
