import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { LineChart, BarChart } from '../components/Charts'

export default function StaffDashboard() {
  const stats = {
    totalProducts: 2,
    totalTransactions: 3
  }

  const recentTransactions = [
    {
      id: 'TXN-1',
      type: 'Import',
      date: 'April 25, 2026',
      product: 'Laptop Dell XPS 15',
      quantity: 25
    }
  ]

  const transactionTrendData = [30, 45, 35, 60, 50, 55]
  const importExportData = [
    [50, 35, 55, 45, 60, 40],
    [35, 50, 40, 60, 45, 65]
  ]

  return (
    <div className="dashboard-layout">
      <Sidebar userRole="staff" />
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Dashboard</span>
          </div>
          <div className="header-content">
            <h1>Dashboard - Staff</h1>
            <p>Overview of your inventory operations</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon products">📦</div>
              <div className="stat-info">
                <p className="stat-number">{stats.totalProducts}</p>
                <p className="stat-label">Total Products</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon transactions">📊</div>
              <div className="stat-info">
                <p className="stat-number">{stats.totalTransactions}</p>
                <p className="stat-label">Total Transactions</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Transactions trend</h3>
              <LineChart data={transactionTrendData} />
            </div>
            <div className="chart-card">
              <h3>Import vs Export</h3>
              <BarChart data={importExportData} />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="activity-section">
            <div className="activity-header">
              <h2>Recent Transactions</h2>
              <a href="#" className="view-more">View more</a>
            </div>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><span className="badge">{item.type}</span></td>
                    <td>{item.date}</td>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
