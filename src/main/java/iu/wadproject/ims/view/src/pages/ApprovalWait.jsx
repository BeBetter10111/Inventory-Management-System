import { useNavigate } from 'react-router-dom'

export default function ApprovalWait() {
  const navigate = useNavigate()

  return (
    <div className="container approval-container">
      <div className="approval-box">
        <h1>Inventory Management System</h1>
        
        <div className="approval-content">
          <h2>Wait for Admin approval</h2>
          <p>Admin will notify you by email after reviewing your account</p>
          <button className="btn-primary" onClick={() => navigate('/login')}>Go Back</button>
        </div>
      </div>
    </div>
  )
}
