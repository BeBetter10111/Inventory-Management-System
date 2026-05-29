import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LineChart, BarChart } from "../components/Charts";
import { userService } from "../services/userService.js";
import { productService } from "../services/productService.js";
import { transactionService } from "../services/transactionService.js";
import { activityLogService } from "../services/activityLogService.js";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [tus, tps, tts, rats] = await Promise.all([
        userService.getAllUsers(),
        productService.getAllProducts(),
        transactionService.getAllTransactions(),
        activityLogService.getAllLogs(),
      ]);

      setTotalUsers(tus.length || 0);
      setTotalProducts(tps.length || 0);
      setTotalTransactions(tts.length || 0);
      setRecentActivity(rats || []);
    };

    fetchData();
  }, []);

  const transactionTrendData = [30, 45, 35, 60, 50, 55];

  const importExportData = [
    [50, 35, 55, 45, 60, 40],
    [35, 50, 40, 60, 45, 65],
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar userRole="admin" />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">
              Home
            </a>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Dashboard</span>
          </div>
          <div className="header-content">
            <h1>Dashboard - Admin</h1>
            <p>Overview of your inventory operations</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon users">👤</div>

              <div className="stat-info">
                <p className="stat-number">{totalUsers}</p>
                <p className="stat-label">Total Users</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon products">📦</div>

              <div className="stat-info">
                <p className="stat-number">{totalProducts}</p>
                <p className="stat-label">Total Products</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon transactions">📊</div>

              <div className="stat-info">
                <p className="stat-number">{totalTransactions}</p>
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

          {/* Recent Activity */}
          <div className="activity-section">
            <div className="activity-header">
              <h2>Recent Activity</h2>
              <Link to={"/admin/activity-logs"} className="view-more">View more</Link>
            </div>

            <table className="activity-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {recentActivity.map((item) => (
                  <tr key={item.activityId}>
                    <td>{item.activityId}</td>
                    <td>{item.type}</td>
                    <td>{item.user.fullName}</td>
                    <td>{new Date(`${item.timestamp}`).toDateString()}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
