import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function UserPage({ userRole = 'admin' }) {
  const [users, setUsers] = useState([
    {
      id: 'JD',
      fullName: 'John Doe',
      email: 'johndoe@gmail.com',
      role: 'Admin',
      status: 'Active'
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [viewingUser, setViewingUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Staff',
    status: 'Active'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleOpenAddModal = () => {
    setFormData({ fullName: '', email: '', role: 'Staff', status: 'Active' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (user) => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status
    })
    setEditingId(user.id)
    setIsEditModalOpen(true)
  }

  const handleOpenViewModal = (user) => {
    setViewingUser(user)
    setIsViewModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ fullName: '', email: '', role: 'Staff', status: 'Active' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ fullName: '', email: '', role: 'Staff', status: 'Active' })
  }

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false)
    setViewingUser(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddUser = () => {
    if (formData.fullName && formData.email && formData.role) {
      const newId = formData.fullName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()

      const newUser = {
        id: newId,
        ...formData
      }
      setUsers(prev => [...prev, newUser])
      handleCloseAddModal()
      setCurrentPage(1)
    }
  }

  const handleEditUser = () => {
    if (formData.fullName && formData.email && formData.role) {
      setUsers(prev =>
        prev.map(user =>
          user.id === editingId ? { ...user, ...formData } : user
        )
      )
      handleCloseEditModal()
    }
  }

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id))
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const roles = ['All Roles', 'Admin', 'Staff']
  const statuses = ['All Status', 'Active', 'Inactive', 'Pending']

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Users</span>
          </div>
          <div className="header-content">
            <h1>Users</h1>
            <p>Manage your users</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Search and Filter Section */}
          <div className="users-search-filter">
            <div className="search-filter-wrapper">
              <div className="search-box-users">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="filter-select-users"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="filter-select-users"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-section">
            <table className="users-data-table">
              <thead>
                <tr>
                  <th className="col-checkbox" style={{ width: '5%' }}>
                    <input type="checkbox" />
                  </th>
                  <th className="col-fullname">Full Name</th>
                  <th className="col-email">Email</th>
                  <th className="col-role">Role</th>
                  <th className="col-status">Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="col-checkbox">
                      <input type="checkbox" />
                    </td>
                    <td className="col-fullname">
                      <div className="user-name-cell">
                        <span className="user-id-badge">{user.id}</span>
                        <span className="user-name">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="col-email">{user.email}</td>
                    <td className="col-role">{user.role}</td>
                    <td className="col-status">
                      <span className={`status-badge status-${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="col-actions">
                      <div className="action-buttons-users">
                        <button
                          onClick={() => handleOpenViewModal(user)}
                          className="btn-view-users"
                        >
                          View
                        </button>
                        <button
                          className="btn-more-users"
                          onClick={(e) => {
                            e.currentTarget.nextElementSibling?.classList.toggle('show')
                          }}
                        >
                          ⋯
                        </button>
                        <div className="dropdown-menu">
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="dropdown-item"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="dropdown-item delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedUsers.length === 0 && (
              <div className="no-data-message">
                <p>No users found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="users-pagination">
              <span className="pagination-info">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </span>
              <div className="pagination-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="pagination-number">{currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New User</h2>
                <button className="modal-close" onClick={handleCloseAddModal}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-primary" onClick={handleAddUser}>Add User</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit User</h2>
                <button className="modal-close" onClick={handleCloseEditModal}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-primary" onClick={handleEditUser}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* View User Modal */}
        {isViewModalOpen && viewingUser && (
          <div className="modal-overlay" onClick={handleCloseViewModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>User Details</h2>
                <button className="modal-close" onClick={handleCloseViewModal}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <p className="field-value">{viewingUser.fullName}</p>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <p className="field-value">{viewingUser.email}</p>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <p className="field-value">{viewingUser.role}</p>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <p className="field-value">
                    <span className={`status-badge status-${viewingUser.status.toLowerCase()}`}>
                      {viewingUser.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleCloseViewModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
