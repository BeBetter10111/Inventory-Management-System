import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Categories({ userRole = 'admin' }) {
  const [categories, setCategories] = useState([
    {
      id: 'CAT-1',
      name: 'Electronics',
      unit: 'Device'
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    unit: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenAddModal = () => {
    setFormData({ name: '', unit: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (category) => {
    setFormData({
      name: category.name,
      unit: category.unit
    })
    setEditingId(category.id)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ name: '', unit: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ name: '', unit: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = () => {
    if (formData.name && formData.unit) {
      const newCategory = {
        id: `CAT-${categories.length + 1}`,
        ...formData
      }
      setCategories(prev => [...prev, newCategory])
      handleCloseAddModal()
    }
  }

  const handleEditCategory = () => {
    if (formData.name && formData.unit) {
      setCategories(prev =>
        prev.map(category =>
          category.id === editingId ? { ...category, ...formData } : category
        )
      )
      handleCloseEditModal()
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Categories</span>
          </div>
          <div className="header-content">
            <h1>Categories</h1>
            <p>View all Product Categories</p>
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
                  <th>Category Name</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCategories.length === 0 && (
              <div className="no-data">
                <p>No categories found</p>
              </div>
            )}
            {filteredCategories.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredCategories.length} of {filteredCategories.length} categories</p>
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
