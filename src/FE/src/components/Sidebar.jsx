import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar({ userRole }) {
  const navigate = useNavigate()
  const location = useLocation()

  const adminMenuItems = [
    { label: 'Home', icon: '🏠', path: '/admin' },
    { label: 'Transactions', icon: '📊', path: '/admin/transactions' },
    { label: 'Products', icon: '📦', path: '/admin/products' },
    { label: 'Categories', icon: '🏷️', path: '/admin/categories' },
    { label: 'Suppliers', icon: '🚚', path: '/admin/suppliers' },
    { label: 'Buyers', icon: '👥', path: '/admin/buyers' },
    { label: 'Users', icon: '👤', path: '/admin/users' },
    { label: 'Activity Logs', icon: '📋', path: '/admin/activity-logs' }
  ]

  const staffMenuItems = [
    { label: 'Home', icon: '🏠', path: '/staff' },
    { label: 'Transactions', icon: '📊', path: '/staff/transactions' },
    { label: 'Products', icon: '📦', path: '/staff/products' },
    { label: 'Categories', icon: '🏷️', path: '/staff/categories' },
    { label: 'Suppliers', icon: '🚚', path: '/staff/suppliers' },
    { label: 'Buyers', icon: '👥', path: '/staff/buyers' },
    { label: 'Inventory', icon: '📈', path: '/staff/inventory' }
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : staffMenuItems

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Inventory<br />Management<br />System</h3>
        <span className={`role-badge role-${userRole}`}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="divider"></div>
        <button className="nav-item footer-item" onClick={() => {
          if (userRole === 'admin') {
            navigate('/admin/settings')
          } else if (userRole === 'staff') {
            navigate('/staff/settings')
          }
        }}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </button>
        <button className="nav-item footer-item" onClick={() => {
          if (userRole === 'admin') {
            navigate('/admin/profile')
          } else if (userRole === 'staff') {
            navigate('/staff/profile')
          }
        }}>
          <span className="nav-icon">👤</span>
          <span className="nav-label">Your Profile</span>
        </button>
        <div className="user-initials">{userRole === 'admin' ? 'AD' : 'ST'}</div>
      </div>
    </aside>
  )
}
