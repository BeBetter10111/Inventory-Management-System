import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function StaffInventory({ userRole = 'staff' }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [importProducts, setImportProducts] = useState([{ id: Date.now(), productId: '', quantity: '' }])
  const [exportProducts, setExportProducts] = useState([{ id: Date.now(), productId: '', quantity: '' }])

  const addImportProductRow = () => {
    setImportProducts([...importProducts, { id: Date.now(), productId: '', quantity: '' }])
  }

  const removeImportProductRow = (id) => {
    if (importProducts.length > 1) {
      setImportProducts(importProducts.filter(p => p.id !== id))
    }
  }

  const addExportProductRow = () => {
    setExportProducts([...exportProducts, { id: Date.now(), productId: '', quantity: '' }])
  }

  const removeExportProductRow = (id) => {
    if (exportProducts.length > 1) {
      setExportProducts(exportProducts.filter(p => p.id !== id))
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Inventory</span>
          </div>
          <div className="header-content">
            <h1>Inventory</h1>
            <p>Manage your inventory supply chain</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <select className="filter-select">
                <option value="">All Categories</option>
              </select>
              <select className="filter-select">
                <option value="">All Suppliers</option>
              </select>
            </div>
            <div className="action-group" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setIsImportModalOpen(true)}>
                Import
              </button>
              <button className="btn-secondary" onClick={() => setIsExportModalOpen(true)}>
                Export
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock Quantity</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SKU-1001-101</td>
                  <td>Laptop Dell XPS 15</td>
                  <td>Electronics</td>
                  <td>25</td>
                  <td>Dell Vietnam</td>
                </tr>
              </tbody>
            </table>
            <div className="table-footer">
              <p>Showing 1-10 of 1 products</p>
              <div className="pagination">
                <button className="btn-pagination" disabled>Previous</button>
                <span className="page-number">1</span>
                <button className="btn-pagination" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsImportModalOpen(false)}>
          <div className="modal-content">
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>New Import Transaction</h2>
              <button onClick={() => setIsImportModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsImportModalOpen(false); }}>
              <div className="form-group">
                <label>Supplier</label>
                <select className="filter-select" style={{ width: '100%', padding: '12px' }}>
                  <option value="">Select a supplier</option>
                </select>
              </div>

              <div className="form-group">
                <label>Products</label>
                {importProducts.map((p) => (
                  <div key={p.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <select className="filter-select" style={{ flex: 2, padding: '12px' }}>
                      <option value="">Select a product</option>
                    </select>
                    <input type="number" placeholder="Quantity" style={{ flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                    <button type="button" onClick={() => removeImportProductRow(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>✕</button>
                  </div>
                ))}
                <button type="button" onClick={addImportProductRow} style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>+</span> Add Another Product
                </button>
              </div>

              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea placeholder="Note for this import" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '100px', fontFamily: 'inherit' }}></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsImportModalOpen(false)} style={{ width: 'auto', margin: 0 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto', margin: 0, backgroundColor: '#1a1a1a' }}>Import</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsExportModalOpen(false)}>
          <div className="modal-content">
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>New Export Transaction</h2>
              <button onClick={() => setIsExportModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsExportModalOpen(false); }}>
              <div className="form-group">
                <label>Buyer</label>
                <select className="filter-select" style={{ width: '100%', padding: '12px' }}>
                  <option value="">Select a buyer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Products</label>
                {exportProducts.map((p) => (
                  <div key={p.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <select className="filter-select" style={{ flex: 2, padding: '12px' }}>
                      <option value="">Select a product</option>
                    </select>
                    <input type="number" placeholder="Quantity" style={{ flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                    <button type="button" onClick={() => removeExportProductRow(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>✕</button>
                  </div>
                ))}
                <button type="button" onClick={addExportProductRow} style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>+</span> Add Another Product
                </button>
              </div>

              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea placeholder="Note for this export" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '100px', fontFamily: 'inherit' }}></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsExportModalOpen(false)} style={{ width: 'auto', margin: 0 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto', margin: 0, backgroundColor: '#1a1a1a' }}>Export</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
