import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { transactionService } from "../services/transactionService.js";
import { supplierService } from "../services/supplierService.js";

export default function Transactions({ userRole = "admin" }) {
  const [transactions, setTransactions] = useState([]);
  const [suppliers, setSuppliers] = useState(["All Suppliers"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [txns, supps] = await Promise.all([
          transactionService.getAllTransactions(),
          supplierService.getAllSuppliers(),
        ]);

        setTransactions(txns || []);
        setSuppliers([
          "All Suppliers",
          ...supps.map((sup) => sup.supplierName),
        ]);

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch transactions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.supplier?.supplierName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All Type" || transaction.type === typeFilter;
    const matchesSupplier =
      supplierFilter === "All Suppliers" ||
      transaction.supplier?.supplierName === supplierFilter;

    return matchesSearch && matchesType && matchesSupplier;
  });

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const types = ["All Type", "Import", "Export"];

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar userRole={userRole} />
        <main className="dashboard-main">
          <div className="loading">Loading transactions...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">
              Home
            </a>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Transactions</span>
          </div>

          <div className="header-content">
            <h1>Transactions</h1>
            <p>View all import and export transactions</p>
          </div>
        </div>

        <div className="dashboard-container">
          {error && <div className="error-message">{error}</div>}

          <div className="table-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by code or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <select
                className="filter-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="filter-select"
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
              >
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
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
                  <th>Buyer</th>
                  <th>Note</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td>{transaction.transactionId}</td>
                    <td>
                      <span
                        className={`badge badge-${transaction.type.toLowerCase()}`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>
                      {transaction.supplier?.supplierName ||
                        transaction.buyerName ||
                        "N/A"}
                    </td>
                    <td>{transaction.buyerName || "N/A"}</td>
                    <td>{transaction.note || "-"}</td>
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
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#9ca3af",
                }}
              >
                <p>No transactions found</p>
              </div>
            )}

            <div className="table-footer">
              <p>
                Showing 1-{Math.min(10, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} transactions
              </p>
              <div className="pagination">
                <button className="btn-pagination" disabled>
                  Previous
                </button>
                <span className="page-number">1</span>
                <button className="btn-pagination" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Details Modal */}
      {isDetailModalOpen && selectedTransaction && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && setIsDetailModalOpen(false)
          }
        >
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>
                Transaction Detail - {selectedTransaction.transactionId}
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                ✕
              </button>
            </div>

            <div className="modal-details" style={{ padding: "20px 0" }}>
              {/* Information Section */}
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "15px",
                  }}
                >
                  Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div className="detail-group">
                    <label>Transaction ID</label>
                    <p>{selectedTransaction.transactionId}</p>
                  </div>
                  <div className="detail-group">
                    <label>Type</label>
                    <p>
                      <span
                        className={`badge badge-${selectedTransaction.type.toLowerCase()}`}
                      >
                        {selectedTransaction.type}
                      </span>
                    </p>
                  </div>
                  <div className="detail-group">
                    <label>Date</label>
                    <p>
                      {new Date(selectedTransaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="detail-group">
                    <label>Supplier</label>
                    <p>
                      {selectedTransaction.supplier?.supplierName ||
                        selectedTransaction.buyerName ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="detail-group">
                    <label>Buyer</label>
                    <p>{selectedTransaction.buyerName || "N/A"}</p>
                  </div>
                  <div className="detail-group">
                    <label>Note</label>
                    <p>{selectedTransaction.note || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "15px",
                  }}
                >
                  Items
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 0",
                          fontWeight: "600",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        Product
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px 0",
                          fontWeight: "600",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        Quantity
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "10px 0",
                          fontWeight: "600",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        Unit Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.transactionDetails &&
                      selectedTransaction.transactionDetails.map(
                        (item, index) => (
                          <tr
                            key={index}
                            style={{ borderBottom: "1px solid #e5e7eb" }}
                          >
                            <td style={{ padding: "12px 0", color: "#1f2937" }}>
                              {item.product?.productName || "N/A"}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "12px 0",
                                color: "#1f2937",
                              }}
                            >
                              {item.quantity}
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "12px 0",
                                color: "#1f2937",
                              }}
                            >
                              {item.unitPrice}
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "12px 0",
                                color: "#1f2937",
                                fontWeight: "600",
                              }}
                            >
                              {item.subtotal}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "30px",
                }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsDetailModalOpen(false)}
                  style={{ width: "auto", margin: 0 }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
