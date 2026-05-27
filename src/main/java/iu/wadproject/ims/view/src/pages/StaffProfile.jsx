import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Profile({ userRole = 'staff' || 'admin' }) {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const [editData, setEditData] = useState({ ...userProfile })

  const handleEditClick = () => {
    setEditData({ ...userProfile })
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserProfile({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...userProfile })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }))
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
            {!isEditing && (
              <button className="btn-edit-profile" onClick={handleEditClick}>
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {/* Personal Information */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p className="section-description">
              {isEditing ? 'Update your personal details and information.' : 'View your personal details and information.'}
            </p>

            <div className="profile-form">
              {isEditing ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-save" onClick={handleSave}>
                      ✓ Save Changes
                    </button>
                    <button className="btn-cancel" onClick={handleCancel}>
                      ✕ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
