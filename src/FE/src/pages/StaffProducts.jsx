import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Products({ userRole = 'admin' }) {
  const [products, setProducts] = useState([
    {
      id: 'SKU-0001-01',
      productName: 'Laptop Dell XPS 15',
      category: 'Electronic',
      supplier: 'Dell Vietnam',
      price: '$1,659.00',
      stockQuantity: 25,
      description: 'Dell XPS 15'
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
    productName: '',
    category: '',
    supplier: '',
    price: '',
    stockQuantity: '',
    description: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleOpenAddModal = () => {
    setFormData({
      productName: '',
      category: '',
      supplier: '',
      price: '',
      stockQuantity: '',
      description: ''
    })
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (product) => {
    setFormData({
      productName: product.productName,
      category: product.category,
      supplier: product.supplier,
      price: product.price,
      stockQuantity: product.stockQuantity,
      description: product.description
    })
    setEditingId(product.id)
    setIsEditModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({
      productName: '',
      category: '',
      supplier: '',
      price: '',
      stockQuantity: '',
      description: ''
    })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingId(null)
    setFormData({
      productName: '',
      category: '',
      supplier: '',
      price: '',
      stockQuantity: '',
      description: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = () => {
    if (formData.productName && formData.category && formData.supplier) {
      try {
        const newProduct = {
          id: `SKU-${String(products.length + 1).padStart(4, '0')}-01`,
          ...formData
        }
        setProducts(prev => [...prev, newProduct])
        handleCloseAddModal()
        showNotification('success', `Product "${formData.productName}" has been added`)
      } catch (error) {
        showNotification('error', `Error occurred while adding product "${formData.productName}": ${error.message}`)
      }
    } else {
      showNotification('error', 'Please fill in all required fields')
    }
  }

  const handleEditProduct = () => {
    if (formData.productName && formData.category && formData.supplier) {
      setProducts(prev =>
        prev.map(product =>
          product.id === editingId ? { ...product, ...formData } : product
        )
      )
      handleCloseEditModal()
    }
  }

  const handleOpenDeleteModal = (product) => {
    setDeletingId(product.id)
    setDeletingItemName(product.productName)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingId(null)
    setDeletingItemName('')
  }

  const handleConfirmDelete = () => {
    setProducts(prev => prev.filter(product => product.id !== deletingId))
    handleCloseDeleteModal()
  }

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(product => !selectedCategory || product.category === selectedCategory)
   .filter(product => !selectedSupplier || product.supplier === selectedSupplier)

  const categories = [...new Set(products.map(p => p.category))]
  const suppliers = [...new Set(products.map(p => p.supplier))]

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
            <span>Product</span>
          </div>
          <div className="header-content">
            <h1>Product</h1>
            <p>Manage your Products</p>
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
            <div className="filter-group">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select 
                value={selectedSupplier} 
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="filter-select"
              >
                <option value="">All Suppliers</option>
                {suppliers.map(sup => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>
            {userRole === 'admin' && (
              <button className="btn-add" onClick={handleOpenAddModal}>
                Add Product
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Price</th>
                  <th>Stock Quantity</th>
                  <th>Description</th>
                  {userRole === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>{product.supplier}</td>
                    <td>{product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.description}</td>
                    {userRole === 'admin' && (
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => handleOpenEditModal(product)}>Edit</button>
                        <button className="btn-more" onClick={() => handleOpenDeleteModal(product)}>•••</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="no-data">
                <p>Showing 1-10 of 1 products</p>
              </div>
            )}
            {filteredProducts.length > 0 && (
              <div className="table-footer">
                <p>Showing 1-{filteredProducts.length} of {filteredProducts.length} products</p>
                <div className="pagination">
                  <button className="btn-pagination" disabled>Previous</button>
                  <span className="page-number">1</span>
                  <button className="btn-pagination" disabled>Next</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={handleCloseAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Product</h2>
                <button className="btn-close" onClick={handleCloseAddModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Enter category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      placeholder="Enter supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      placeholder="Enter quantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseAddModal}>Cancel</button>
                <button className="btn-submit" onClick={handleAddProduct}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay" onClick={handleCloseEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Product</h2>
                <button className="btn-close" onClick={handleCloseEditModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseEditModal}>Cancel</button>
                <button className="btn-submit" onClick={handleEditProduct}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Product Modal */}
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={handleCloseDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Remove this product?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove product "{deletingItemName}"? This action is irreversible!</p>
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
