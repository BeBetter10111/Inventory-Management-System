import Sidebar from '../components/Sidebar'

export default function Profile({ userRole = 'staff' }) {
  const userProfile = {
    initials: 'AW',
    name: 'Alan Walker',
    role: 'Staff',
    email: 'alanwalker@gmail.com',
    username: 'Alan Walker',
    fullName: 'Alan Walker',
    phoneNumber: '+12345678'
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Your Profile</span>
          </div>
          <div className="header-content">
            <h1>Your Profile</h1>
            <p>Manage your information</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-avatar">{userProfile.initials}</div>
              <div className="profile-details">
                <h2>{userProfile.name}</h2>
                <p className="profile-role">{userProfile.role}</p>
                <p className="profile-email">{userProfile.email}</p>
              </div>
            </div>
            <button className="btn-edit-profile">Edit Profile</button>
          </div>

          {/* Personal Information */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p className="section-description">Update your personal details and information.</p>

            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" value={userProfile.username} readOnly />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={userProfile.fullName} readOnly />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={userProfile.email} readOnly />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" value={userProfile.phoneNumber} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
