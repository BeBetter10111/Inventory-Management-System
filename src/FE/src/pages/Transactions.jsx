import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Transactions({ userRole = 'admin' }) {
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-1',
      type: 'Import',
      date: 'April 25, 2026',
      supplier: 'Dell Vietnam',
      product: 'Laptop Dell XPS 15',
      quantity: 25,
      unitPrice: '$1,349.00',
      estTotal: '$37,975.00',
      items: [
        {
          product: 'Laptop Dell XPS 15',
          quantity: 25,
          unitPrice: '$1,519.00',
          subtotal: '$37,975.00'
        }
      ]
    },
    {
      id: 'TXN-2',
      type: 'Export',
      date: 'April 24, 2026',
      supplier: 'Tech Store A',
      product: 'Monitor LG 27"',
      quantity: 15,
      unitPrice: '$299.00',
      estTotal: '$4,485.00',
      items: [
        {
          product: 'Monitor LG 27"',
          quantity: 15,
          unitPrice: '$299.00',
          subtotal: '$4,485.00'
        }
      ]
    },
    {
      id: 'TXN-3',
      type: 'Import',
      date: 'April 23, 2026',
      supplier: 'Apple Inc',
      product: 'iPad Pro 12.9"',
      quantity: 10,
      unitPrice: '$1,099.00',
      estTotal: '$10,990.00',
      items: [
        {
          product: 'iPad Pro 12.9"',
          quantity: 10,
          unitPrice: '$1,099.00',
          subtotal: '$10,990.00'
        }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Type')
  const [supplierFilter, setSupplierFilter] = useState('All Suppliers')
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'All Type' || transaction.type === typeFilter
    const matchesSupplier = supplierFilter === 'All Suppliers' || transaction.supplier === supplierFilter

    return matchesSearch && matchesType && matchesSupplier
  })

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailModalOpen(true)
  }

  const suppliers = ['All Suppliers', 'Dell Vietnam', 'Apple Inc', 'Tech Store A']
  const types = ['All Type', 'Import', 'Export']

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Transactions</span>
          </div>
          <div className="header-content">
            <h1>Transactions</h1>
            <p>View all import and export transactions</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select className="filter-select" value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)}>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Est. Total</th>
                  <th>Unit Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>
                      <span className={`badge badge-${transaction.type.toLowerCase()}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td>{transaction.date}</td>
                    <td>{transaction.supplier}</td>
                    <td>{transaction.product}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.estTotal}</td>
                    <td>{transaction.unitPrice}</td>
                    <td>
                      <button 
                        className="btn-view" 
                        onClick={() => handleViewDetails(transaction)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                <p>No transactions found</p>
              </div>
            )}

            <div className="table-footer">
              <p>Showing 1-{Math.min(10, filteredTransactions.length)} of {filteredTransactions.length} transactions</p>
              <div className="pagination">
                <button className="btn-pagination" disabled>Previous</button>
                <span className="page-number">1</span>
                <button className="btn-pagination" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Details Modal */}
      {isDetailModalOpen && selectedTransaction && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsDetailModalOpen(false)}>
          <div className="modal-content">
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Transaction Detail - {selectedTransaction.id}</h2>
              <button onClick={() => setIsDetailModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>

            <div className="modal-details" style={{ padding: '20px 0' }}>
              {/* Information Section */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="detail-group">
                    <label>Transaction ID</label>
                    <p>{selectedTransaction.id}</p>
                  </div>
                  <div className="detail-group">
                    <label>Type</label>
                    <p>
                      <span className={`badge badge-${selectedTransaction.type.toLowerCase()}`}>
                        {selectedTransaction.type}
                      </span>
                    </p>
                  </div>
                  <div className="detail-group">
                    <label>Date</label>
                    <p>{selectedTransaction.date}</p>
                  </div>
                  <div className="detail-group">
                    <label>Supplier</label>
                    <p>{selectedTransaction.supplier}</p>
                  </div>
                  <div className="detail-group">
                    <label>Est. Total</label>
                    <p>{selectedTransaction.estTotal}</p>
                  </div>
                  <div className="detail-group">
                    <label>Unit Price</label>
                    <p>{selectedTransaction.unitPrice}</p>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Items</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '10px 0', fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>Product</th>
                      <th style={{ textAlign: 'center', padding: '10px 0', fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>Quantity</th>
                      <th style={{ textAlign: 'right', padding: '10px 0', fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>Unit Price</th>
                      <th style={{ textAlign: 'right', padding: '10px 0', fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.items && selectedTransaction.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 0', color: '#1f2937' }}>{item.product}</td>
                        <td style={{ textAlign: 'center', padding: '12px 0', color: '#1f2937' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', padding: '12px 0', color: '#1f2937' }}>{item.unitPrice}</td>
                        <td style={{ textAlign: 'right', padding: '12px 0', color: '#1f2937', fontWeight: '600' }}>{item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsDetailModalOpen(false)} style={{ width: 'auto', margin: 0 }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
