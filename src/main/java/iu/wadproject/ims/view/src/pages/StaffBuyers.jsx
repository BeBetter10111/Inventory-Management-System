import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { buyerService } from '../services/buyerService'

export default function Buyers({ userRole = 'admin' }) {
  const [buyers, setBuyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [notification, setNotification] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deletingItemName, setDeletingItemName] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    address: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  
  // Fetch buyers on component mount
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true)
        const response = await buyerService.getAllBuyers()
        setBuyers(response)
        setError(null)
      } catch (error) {
        setError(error.message || 'Failed to fetch buyers')
        console.error('Error fetching buyers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBuyers()
  }, [])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setFormData({ fullName: '', address: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (buyer) => {
    setFormData({
      fullName: buyer.fullName,
      address: buyer.address
    })
    setEditingId(buyer.buyerId)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ fullName: '', address: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ fullName: '', address: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddBuyer = async () => {
    if (formData.fullName && formData.address) {
      //Fix Duplicate
      const isDuplicate = buyers.some(
            (b) => b.fullName.trim().toLowerCase() === formData.fullName.trim().toLowerCase()
        );

        if (isDuplicate) {
            showNotification('error', `Buyer"${formData.fullName}" is already existed`);
            return; 
        }
      try {
        const newBuyer = await buyerService.createBuyer(formData.fullName, formData.address);

        setBuyers(prev => [...prev, newBuyer])

        handleCloseAddModal()
        showNotification('success', `Buyer "${formData.fullName}" has been added`)
      } catch (error) {
        showNotification('error', `Error occurred while adding buyer: ${error.message}`)
      }
    } else {
      showNotification('error', 'Please fill in all required fields')
    }
  }

  const handleEditBuyer = async () => {
    if (formData.fullName && formData.address) {
      //Fix Duplicate
      const isDuplicate = buyers.some(
            (b) => b.buyerId !== editingId && 
                   b.fullName.trim().toLowerCase() === formData.fullName.trim().toLowerCase()
        );

        if (isDuplicate) {
            showNotification('error', `Buyer "${formData.fullName}" is already existed!`);
            return; 
        }
      try {
        const updatedBuyer = await buyerService.updateBuyer(editingId, formData.fullName, formData.address);

        setBuyers(prev =>
          prev.map(buyer =>
            buyer.buyerId === editingId ? updatedBuyer : buyer
          )
        )
        handleCloseEditModal()
        showNotification('success', 'Buyer updated successfully')
      } catch (error) {
        showNotification('error', `Error updating buyer: ${error.message}`)
      }
    }
  }

  const handleOpenDeleteModal = (buyer) => {
    setDeletingId(buyer.buyerId)
    setDeletingItemName(buyer.fullName)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = async () => {
    try {
      await buyerService.deleteBuyer(deletingId)
      setBuyers(prev => prev.filter(buyer => buyer.buyerId !== deletingId))
      handleCloseDeleteModal()
      showNotification('success', `Buyer "${deletingItemName}" has been deleted`)
    } catch (error) {
      showNotification('error', `Error deleting buyer: ${error.message}`)
    }
  }

  const filteredBuyers = buyers.filter(buyer =>
    buyer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="loading">Loading buyers...</div>
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
            <span>Buyers</span>
          </div>
          <div className="header-content">
            <h1>Buyers</h1>
            <p>View all registered buyers</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {userRole === 'admin' && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Buyer
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  {userRole === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.map((buyer) => (
                  <tr key={buyer.buyerId}>
                    <td>{buyer.buyerId}</td>
                    <td>{buyer.fullName}</td>
                    <td>{buyer.address}</td>
                    {userRole === 'admin' && (
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEditModal(buyer)}>Edit</button>
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(buyer)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBuyers.length === 0 && (
              <div className="no-data">
                <p>No buyers found</p>
              </div>
            )}
            {filteredBuyers.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredBuyers.length} of {filteredBuyers.length} buyers</p>
                <div className="pagination">
                  <button className="btn-pagination" disabled>Previous</button>
                  <span className="page-number">1</span>
                  <button className="btn-pagination" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Buyer Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Buyer</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Buyer Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your buyer name"
                    value={formData.fullName}
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
                <button className="btn-submit" onClick={handleAddBuyer}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Buyer Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Buyer</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Buyer Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                <button className="btn-submit" onClick={handleEditBuyer}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Buyer Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this buyer?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove buyer "{deletingItemName}"? This action is irreversible!</p>
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
            <span>Buyers</span>
          </div>
          <div className="header-content">
            <h1>Buyers</h1>
            <p>View all registered buyers</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or name..."
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
                  <th>Phone Number</th>
                  <th>Email</th>
                  {userRole === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.map((buyer) => (
                  <tr key={buyer.id}>
                    <td>{buyer.id}</td>
                    <td>{buyer.name}</td>
                    <td>{buyer.phoneNumber}</td>
                    <td>{buyer.email}</td>
                    {userRole === 'admin' && (
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEditModal(buyer)}>Edit</button>
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(buyer)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBuyers.length === 0 && (
              <div className="no-data">
                <p>No buyers found</p>
              </div>
            )}
            {filteredBuyers.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredBuyers.length} of {filteredBuyers.length} products</p>
                <div className="pagination">
                  <button className="btn-pagination" disabled>Previous</button>
                  <span className="page-number">1</span>
                  <button className="btn-pagination" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Buyer Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Buyer</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Buyer Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your buyer name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="(+84)312 345 678"
                      value={formData.phoneNumber}
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
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-submit" onClick={handleAddBuyer}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Buyer Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Buyer</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Buyer Name</label>
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
                      name="phoneNumber"
                      value={formData.phoneNumber}
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
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-submit" onClick={handleEditBuyer}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Buyer Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this buyer?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove buyer "{deletingItemName}"? This action is irreversible!</p>
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

