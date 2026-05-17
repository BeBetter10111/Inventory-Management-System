import Sidebar from '../components/Sidebar'

export default function Settings({ userRole}) {
  const handleLogout = () => {
    // Add actual logout functionality here
    // For now, just navigate to the login page
    // Clear any authentication tokens or user data here if needed
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('userData')
    window.location.href = '/login'


  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

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
                <button className="btn-action">Change Password</button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Log out</h4>
                  <p>Log out of your account</p>
                </div>
                <button className="btn-logout" onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
