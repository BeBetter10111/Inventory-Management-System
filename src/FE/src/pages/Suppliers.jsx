import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Suppliers({ userRole = 'admin' }) {
  const [suppliers, setSuppliers] = useState([
    {
      id: 'SP-1',
      name: 'Dell Vietnam',
      contact: '(+84)312 345 678',
      email: 'vn_support@dell.com',
      address: '23 Nguyen Thi Huynh Street, Ward 8, Phu Nhuan District'
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [notification, setNotification] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deletingItemName, setDeletingItemName] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setFormData({ name: '', contact: '', email: '', address: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (supplier) => {
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      address: supplier.address
    })
    setEditingId(supplier.id)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ name: '', contact: '', email: '', address: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ name: '', contact: '', email: '', address: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSupplier = () => {
    if (formData.name && formData.contact && formData.email && formData.address) {
      try {
        const newSupplier = {
          id: `SP-${suppliers.length + 1}`,
          ...formData
        }
        setSuppliers(prev => [...prev, newSupplier])
        handleCloseAddModal()
        showNotification('success', `Supplier "${formData.name}" has been added`)
      } catch (error) {
        showNotification('error', `Error occurred while adding supplier "${formData.name}": ${error.message}`)
      }
    } else {
      showNotification('error', 'Please fill in all required fields')
    }
  }

  const handleEditSupplier = () => {
    if (formData.name && formData.contact && formData.email && formData.address) {
      setSuppliers(prev =>
        prev.map(supplier =>
          supplier.id === editingId ? { ...supplier, ...formData } : supplier
        )
      )
      handleCloseEditModal()
    }
  }

  const handleOpenDeleteModal = (supplier) => {
    setDeletingId(supplier.id)
    setDeletingItemName(supplier.name)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = () => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== deletingId))
    handleCloseDeleteModal()
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      {notification && (
        <div className={`notification-toast notification-${notification.type}`}>
          <span className="notification-icon">{notification.type === 'success' ? '✓' : '✕'}</span>
          <span className="notification-message">{notification.message}</span>
        </div>
      )}

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Suppliers</span>
          </div>
          <div className="header-content">
            <h1>Suppliers</h1>
            <p>Manage all registered suppliers</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {userRole === 'admin' && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Supplier
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.address}</td>
                    <td className="actions-cell">
                      {userRole === 'admin' && (
                        <>
                          <button className="btn-edit" onClick={() => handleOpenEditModal(supplier)}>Edit</button>
                          <button className="btn-more" onClick={() => handleOpenDeleteModal(supplier)}>•••</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSuppliers.length === 0 && (
              <div className="no-data">
                <p>Showing 1-10 of 1 products</p>
              </div>
            )}
            {filteredSuppliers.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredSuppliers.length} of {filteredSuppliers.length} products</p>
                <div className="pagination">
                  <button className="btn-pagination" disabled>Previous</button>
                  <span className="page-number">1</span>
                  <button className="btn-pagination" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Supplier Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Supplier</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Supplier Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your company name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact</label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="(+84)312 345 678"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="companyemail@provider.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    placeholder="Enter address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-submit" onClick={handleAddSupplier}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Supplier Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Supplier</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Supplier Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-submit" onClick={handleEditSupplier}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Supplier Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this supplier?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove supplier "{deletingItemName}"? This action is irreversible!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseDeleteModal}>Cancel</button>
                <button className="btn-delete" onClick={handleConfirmDelete}>Disable</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
