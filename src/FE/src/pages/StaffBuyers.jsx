import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Buyers({ userRole = 'admin' }) {
  const [buyers, setBuyers] = useState([
    {
      id: 'BR-1',
      name: 'GearVN',
      phoneNumber: '(+84)312 345 678',
      email: 'gearvn@gmail.com'
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deletingItemName, setDeletingItemName] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenAddModal = () => {
    setFormData({ name: '', phoneNumber: '', email: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (buyer) => {
    setFormData({
      name: buyer.name,
      phoneNumber: buyer.phoneNumber,
      email: buyer.email
    })
    setEditingId(buyer.id)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ name: '', phoneNumber: '', email: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ name: '', phoneNumber: '', email: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddBuyer = () => {
    if (formData.name && formData.phoneNumber && formData.email) {
      const newBuyer = {
        id: `BR-${buyers.length + 1}`,
        ...formData
      }
      setBuyers(prev => [...prev, newBuyer])
      handleCloseAddModal()
    }
  }

  const handleEditBuyer = () => {
    if (formData.name && formData.phoneNumber && formData.email) {
      setBuyers(prev =>
        prev.map(buyer =>
          buyer.id === editingId ? { ...buyer, ...formData } : buyer
        )
      )
      handleCloseEditModal()
    }
  }

  const handleOpenDeleteModal = (buyer) => {
    setDeletingId(buyer.id)
    setDeletingItemName(buyer.name)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = () => {
    setBuyers(prev => prev.filter(buyer => buyer.id !== deletingId))
    handleCloseDeleteModal()
  }

  const filteredBuyers = buyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

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
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(buyer)}>•••</button>
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
