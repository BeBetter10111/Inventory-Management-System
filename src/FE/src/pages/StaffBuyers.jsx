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
  const [editingId, setEditingId] = useState(null)
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
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.map((buyer) => (
                  <tr key={buyer.id}>
                    <td>{buyer.id}</td>
                    <td>{buyer.name}</td>
                    <td>{buyer.phoneNumber}</td>
                    <td>{buyer.email}</td>
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
      </main>
    </div>
  )
}
