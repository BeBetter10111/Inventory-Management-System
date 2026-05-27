export default function LogoutConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content logout-confirm-modal">
        <div className="modal-header">
          <h2>Confirm Logout</h2>
          <button className="modal-close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="logout-warning-icon">⚠️</div>
          <p className="logout-warning-text">
            Are you sure you want to log out?
          </p>
          <p className="logout-warning-subtext">
            You will need to log in again to access your account.
          </p>
        </div>

        <div className="modal-footer logout-actions">
          <button className="btn-cancel-modal" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-logout-confirm" onClick={onConfirm}>
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
