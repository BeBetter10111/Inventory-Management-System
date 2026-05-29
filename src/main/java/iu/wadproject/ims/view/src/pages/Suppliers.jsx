import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { supplierService } from '../services/supplierService'

export default function Suppliers({ userRole = 'admin' }) {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deletingItemName, setDeletingItemName] = useState('')
  const [formData, setFormData] = useState({
    supplierName: '',
    contact: '',
    address: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true)
        const data = await supplierService.getAllSuppliers()
        setSuppliers(data)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to fetch suppliers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setFormData({ supplierName: '', contact: '', address: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (supplier) => {
    setFormData({
      supplierName: supplier.supplierName,
      contact: supplier.contact,
      address: supplier.address
    })
    setEditingId(supplier.supplierId)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ supplierName: '', contact: '', address: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ supplierName: '', contact: '', address: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSupplier = async () => {
    if (formData.supplierName && formData.contact && formData.address) {
      try {
        const newSupplier = await supplierService.createSupplier(
          formData.supplierName,
          formData.contact,
          formData.address,
        )
        setSuppliers(prev => [...prev, newSupplier])
        handleCloseAddModal()
        showNotification('success', `Supplier "${formData.supplierName}" has been added`)
      } catch (error) {
        showNotification('error', `Error occurred while adding supplier: ${error.message}`)
      }
    } else {
      showNotification('error', 'Please fill in all required fields')
    }
  }

  const handleEditSupplier = async () => {
    if (formData.supplierName && formData.contact && formData.address) {
      try {
        const updatedSupplier = await supplierService.updateSupplier(editingId, formData.supplierName, formData.contact, formData.address);
        setSuppliers(prev =>
          prev.map(supplier =>
            supplier.supplierId === editingId ? updatedSupplier : supplier
          )
        )
        handleCloseEditModal()
        showNotification('success', 'Supplier updated successfully')
      } catch (error) {
        showNotification('error', `Error updating supplier: ${error.message}`)
      }
    }
  }

  const handleOpenDeleteModal = (supplier) => {
    setDeletingId(supplier.supplierId)
    setDeletingItemName(supplier.supplierName)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = async () => {
    try {
      await supplierService.deleteSupplier(deletingId)
      setSuppliers(prev => prev.filter(supplier => supplier.supplierId !== deletingId))
      handleCloseDeleteModal()
      showNotification('success', `Supplier "${deletingItemName}" has been deleted`)
    } catch (error) {
      showNotification('error', `Error deleting supplier: ${error.message}`)
    }
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="loading">Loading suppliers...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      {notification && (
        <div className={`notification-toast notification-${notification.type}`}>
          <span className="notification-icon">{notification.type === 'success' ? '✓' : '✕'}</span>
          <span className="notification-message">{notification.message}</span>
        </div>
      )}

      {error && (
        <div className="error-message">{error}</div>
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
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.supplierId}>
                    <td>{supplier.supplierId}</td>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.contact}</td>
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
                <p>No suppliers found</p>
              </div>
            )}
            {filteredSuppliers.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredSuppliers.length} of {filteredSuppliers.length} suppliers</p>
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
                      name="supplierName"
                      placeholder="Your company name"
                      value={formData.supplierName}
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
                      name="supplierName"
                      value={formData.supplierName}
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
                <p>Are you sure you want to remove supplier "){deletingItemName}"? This action is irreversible!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseDeleteModal}>Cancel</button>
                <button className="btn-delete" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}