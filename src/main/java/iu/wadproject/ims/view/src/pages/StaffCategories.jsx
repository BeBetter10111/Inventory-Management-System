import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { categoryService } from '../services/categoryService'

export default function Categories({ userRole = 'admin' }) {
  const [categories, setCategories] = useState([])
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
    categoryName: '',
    unit: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await categoryService.getAllCategories()
        setCategories(data)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to fetch categories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setFormData({ categoryName: '', unit: '' })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (category) => {
    setFormData({
      categoryName: category.categoryName,
      unit: category.unit
    })
    setEditingId(category.categoryId)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ categoryName: '', unit: '' })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({ categoryName: '', unit: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = async () => {
    if (formData.categoryName && formData.unit) {
      try {
        const newCategory = await categoryService.createCategory(
          formData.categoryName,
          formData.unit,
        )
        setCategories(prev => [...prev, newCategory])
        handleCloseAddModal()
        showNotification('success', `Category "${formData.categoryName}" has been added`)
      } catch (error) {
        showNotification('error', `Error occurred while adding category: ${error.message}`)
      }
    } else {
      showNotification('error', 'Please fill in all required fields')
    }
  }

  const handleEditCategory = async () => {
    if (formData.categoryName && formData.unit) {
      try {
        const updatedCategory = await categoryService.updateCategory(editingId, formData.categoryName, formData.unit);
        setCategories(prev =>
          prev.map(category =>
            category.categoryId === editingId ? updatedCategory : category
          )
        )
        handleCloseEditModal()
        showNotification('success', 'Category updated successfully')
      } catch (error) {
        showNotification('error', `Error updating category: ${error.message}`)
      }
    }
  }

  const handleOpenDeleteModal = (category) => {
    setDeletingId(category.categoryId)
    setDeletingItemName(category.categoryName)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = async () => {
    try {
      await categoryService.deleteCategory(deletingId)
      setCategories(prev => prev.filter(category => category.categoryId !== deletingId))
      handleCloseDeleteModal()
      showNotification('success', `Category "${deletingItemName}" has been deleted`)
    } catch (error) {
      showNotification('error', `Error deleting category: ${error.message}`)
    }
  }

  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="loading">Loading categories...</div>
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
            {userRole === 'admin' && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Category
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Unit</th>
                  {userRole === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryId}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.unit}</td>
                    {userRole === 'admin' && (
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEditModal(category)}>Edit</button>
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(category)}>•••</button>
                      </td>
                    )}
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

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Category</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    placeholder="Enter category name"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    name="unit"
                    placeholder="Enter unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-submit" onClick={handleAddCategory}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Category</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-submit" onClick={handleEditCategory}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Category Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this category?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove category "{deletingItemName}"? This action is irreversible!</p>
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
            {userRole === 'admin' && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Category
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Unit</th>
                  {userRole === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.unit}</td>
                    {userRole === 'admin' && (
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEditModal(category)}>Edit</button>
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(category)}>•••</button>
                      </td>
                    )}
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

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Category</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    name="unit"
                    placeholder="Enter unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-submit" onClick={handleAddCategory}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Category</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-submit" onClick={handleEditCategory}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Category Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this category?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove category "{deletingItemName}"? This action is irreversible!</p>
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
