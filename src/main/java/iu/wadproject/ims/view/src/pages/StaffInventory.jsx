import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { supplierService } from '../services/supplierService.js';
import { buyerService } from '../services/buyerService.js';
import { productService } from '../services/productService.js';
import { transactionService } from '../services/transactionService.js';

export default function StaffInventory({ userRole = 'staff' }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [importProducts, setImportProducts] = useState([{ id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }])
  const [exportProducts, setExportProducts] = useState([{ id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }])
  const [suppliers, setSuppliers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSuppliers, setProductSuppliers] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [importNote, setImportNote] = useState('');
  const [exportNote, setExportNote] = useState('');

  const fetchProducts = async () => {
    const [pds, txns] = await Promise.all([
      productService.getAllProducts(),
      transactionService.getAllTransactions(),
    ]);

    setProducts(pds || []);

    const map = {};
    (txns || []).forEach((tx) => {
      if (tx.type === 'Import' && tx.supplier && Array.isArray(tx.transactionDetails)) {
        const txDate = new Date(tx.date);
        tx.transactionDetails.forEach((d) => {
          const pid = d.product?.productId;
          if (!pid) return;
          if (!map[pid] || txDate > map[pid].date) {
            map[pid] = { name: tx.supplier.supplierName, date: txDate };
          }
        });
      }
    });

    const simple = {};
    Object.keys(map).forEach((k) => (simple[k] = map[k].name));
    setProductSuppliers(simple);
  };

  useEffect(() => {
    const fetchAll = async () => {
      const [sps, bys] = await Promise.all([
        supplierService.getAllSuppliers(),
        buyerService.getAllBuyers(),
      ]);

      setSuppliers(sps || []);
      setBuyers(bys || []);
      await fetchProducts();
    };

    fetchAll();
  }, []);

  const updateProductRow = (rows, setRows, id, field, value) => {
    setRows(rows.map((row) => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleTransaction = async (type, event) => {
    event.preventDefault();

    const isImport = type === 'Import';
    const rows = isImport ? importProducts : exportProducts;
    const partyId = isImport ? selectedSupplier : selectedBuyer;
    const note = isImport ? importNote : exportNote;

    if (!partyId) {
      alert(`Please select a ${isImport ? 'supplier' : 'buyer'} before continuing.`);
      return;
    }

    const details = rows
      .filter((row) => row.productId && row.quantity)
      .map((row) => ({
        product: { productId: row.productId },
        quantity: Number(row.quantity),
        unitPriceType: row.unitPriceType || 'VND',
      }));

    if (!details.length) {
      alert('Please add at least one product with quantity.');
      return;
    }

    try {
      await transactionService.processTransaction(
        type,
        isImport ? { supplierId: partyId } : null,
        isImport ? null : { buyerId: partyId },
        note,
        details,
      );

      await fetchProducts();

      if (isImport) {
        setImportProducts([{ id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }]);
        setSelectedSupplier('');
        setImportNote('');
        setIsImportModalOpen(false);
      } else {
        setExportProducts([{ id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }]);
        setSelectedBuyer('');
        setExportNote('');
        setIsExportModalOpen(false);
      }

      alert(`${type} transaction submitted successfully.`);
    } catch (error) {
      console.error(error);
      alert(error.message || 'Unable to process transaction.');
    }
  };

  const addImportProductRow = () => {
    setImportProducts([...importProducts, { id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }])
  }

  const removeImportProductRow = (id) => {
    if (importProducts.length > 1) {
      setImportProducts(importProducts.filter(p => p.id !== id))
    }
  }

  const addExportProductRow = () => {
    setExportProducts([...exportProducts, { id: Date.now(), productId: '', quantity: '', unitPriceType: 'VND' }])
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
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.productId}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.category?.categoryName || '-'}</td>
                      <td>{product.stockQuantity}</td>
                      <td>{productSuppliers[product.productId] || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="table-footer">
              <p>Showing 1-{products.length} of {products.length} products</p>
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
            <form className="modal-form" onSubmit={(e) => handleTransaction('Import', e)}>
              <div className="form-group">
                <label>Supplier</label>
                <select
                  className="filter-select"
                  style={{ width: '100%', padding: '12px' }}
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.supplierId} value={supplier.supplierId}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Products</label>
                {importProducts.map((p) => (
                  <div key={p.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <select
                      className="filter-select"
                      style={{ flex: 2, padding: '12px' }}
                      value={p.productId}
                      onChange={(e) => updateProductRow(importProducts, setImportProducts, p.id, 'productId', e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product.productId} value={product.productId}>
                          {product.productName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantity"
                      value={p.quantity}
                      onChange={(e) => updateProductRow(importProducts, setImportProducts, p.id, 'quantity', e.target.value)}
                      style={{ flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    />
                                    <select
                                      value={p.unitPriceType}
                                      onChange={(e) => updateProductRow(importProducts, setImportProducts, p.id, 'unitPriceType', e.target.value)}
                                      style={{ flex: 0.8, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    >
                                      <option value="VND">VND</option>
                                      <option value="USD">USD</option>
                                    </select>
                    <button type="button" onClick={() => removeImportProductRow(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>✕</button>
                  </div>
                ))}
                <button type="button" onClick={addImportProductRow} style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>+</span> Add Another Product
                </button>
              </div>

              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea
                  value={importNote}
                  onChange={(e) => setImportNote(e.target.value)}
                  placeholder="Note for this import"
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '100px', fontFamily: 'inherit' }}
                ></textarea>
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
            <form className="modal-form" onSubmit={(e) => handleTransaction('Export', e)}>
              <div className="form-group">
                <label>Buyer</label>
                <select
                  className="filter-select"
                  style={{ width: '100%', padding: '12px' }}
                  value={selectedBuyer}
                  onChange={(e) => setSelectedBuyer(e.target.value)}
                >
                  <option value="">Select a buyer</option>
                  {buyers.map((buyer) => (
                    <option key={buyer.buyerId} value={buyer.buyerId}>
                      {buyer.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Products</label>
                {exportProducts.map((p) => (
                  <div key={p.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <select
                      className="filter-select"
                      style={{ flex: 2, padding: '12px' }}
                      value={p.productId}
                      onChange={(e) => updateProductRow(exportProducts, setExportProducts, p.id, 'productId', e.target.value)}
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product.productId} value={product.productId}>
                          {product.productName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantity"
                      value={p.quantity}
                      onChange={(e) => updateProductRow(exportProducts, setExportProducts, p.id, 'quantity', e.target.value)}
                      style={{ flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    />
                                    <select
                                      value={p.unitPriceType}
                                      onChange={(e) => updateProductRow(exportProducts, setExportProducts, p.id, 'unitPriceType', e.target.value)}
                                      style={{ flex: 0.8, padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    >
                                      <option value="VND">VND</option>
                                      <option value="USD">USD</option>
                                    </select>
                    <button type="button" onClick={() => removeExportProductRow(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '18px' }}>✕</button>
                  </div>
                ))}
                <button type="button" onClick={addExportProductRow} style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>+</span> Add Another Product
                </button>
              </div>

              <div className="form-group">
                <label>Note (Optional)</label>
                <textarea
                  value={exportNote}
                  onChange={(e) => setExportNote(e.target.value)}
                  placeholder="Note for this export"
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '100px', fontFamily: 'inherit' }}
                ></textarea>
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
