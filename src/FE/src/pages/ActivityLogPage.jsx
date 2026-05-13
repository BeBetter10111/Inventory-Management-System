import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function ActivityLogPage({ userRole = 'admin' }) {
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 'AL-1',
      type: 'Import',
      user: 'Alan Walker',
      date: 'April 25, 2026',
      description: "Alan Walker has imported product 'Laptop Dell XPS 15' into inventory"
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'All Types' || log.type === typeFilter

    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  const types = ['All Types', 'Import', 'Export', 'Edit', 'Delete', 'Create']

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  return (
    <div className="dashboard-layout">
      <Sidebar userRole={userRole} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-breadcrumb">
            <a href="#" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">›</span>
            <span>Activity Logs</span>
          </div>
          <div className="header-content">
            <h1>Activity Logs</h1>
            <p>View users activities</p>
          </div>
        </div>

        <div className="dashboard-container">
          {/* Search and Filter Section */}
          <div className="activity-search-filter">
            <div className="search-filter-wrapper">
              <div className="search-box-activity">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by code, user, or description..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="filter-select-activity"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Activity Logs Table */}
          <div className="activity-table-section">
            <table className="activity-data-table">
              <thead>
                <tr>
                  <th className="col-id">#</th>
                  <th className="col-type">Type</th>
                  <th className="col-user">User</th>
                  <th className="col-date">Date</th>
                  <th className="col-description">Description</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map(log => (
                  <tr key={log.id}>
                    <td className="col-id">{log.id}</td>
                    <td className="col-type">
                      <span className={`activity-type activity-type-${log.type.toLowerCase()}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="col-user">{log.user}</td>
                    <td className="col-date">{log.date}</td>
                    <td className="col-description">{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedLogs.length === 0 && (
              <div className="no-data-message">
                <p>No activity logs found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="activity-pagination">
              <span className="pagination-info">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} products
              </span>
              <div className="pagination-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="pagination-number">{currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
