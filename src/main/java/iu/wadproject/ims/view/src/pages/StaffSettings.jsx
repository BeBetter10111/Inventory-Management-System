import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Notification from '../components/Notification'
import LogoutConfirmModal from '../components/LogoutConfirmModal'
import ChangePasswordModal from '../components/ChangePasswordModal'
import { authService } from '../services/authServices.js';

export default function Settings({ userRole }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [notification, setNotification] = useState(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false)
    setNotification({ type: 'success', message: 'You have been logged out successfully!' })
    
    await authService.logout();
    
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  }

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Settings</a>
          </div>
          <div className="header-content">
            <h1>Settings</h1>
            <p>Change your settings</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Account Settings */}
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p className="section-description">Manage your account preferences.</p>

            <div className="settings-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Account Status</h4>
                  <p>Your account is currently active</p>
                </div>
                <span className="status-badge status-active">Active</span>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Password</h4>
                  <p>Change your password</p>
                </div>
                <button className="btn-action" onClick={() => setIsPasswordModalOpen(true)}>Change Password</button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Log out</h4>
                  <p>Log out of your account</p>
                </div>
                <button className="btn-logout" onClick={handleLogoutClick}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  )
}
