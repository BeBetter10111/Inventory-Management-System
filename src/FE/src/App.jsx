import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Showcase from './pages/Showcase'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ApprovalWait from './pages/ApprovalWait'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import Suppliers from './pages/Suppliers'
import Buyers from './pages/StaffBuyers'
import Products from './pages/StaffProducts'
import Categories from './pages/StaffCategories'
import Profile from './pages/StaffProfile'
import Settings from './pages/StaffSettings'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPasswordUUID from './pages/ForgotPasswordUUID'
import VerifyUUID from './pages/VerifyUUID'
import NewPassword from './pages/NewPassword'
import Inventory from './pages/StaffInventory'
import Transactions from './pages/Transactions'
import ActivityLogPage from './pages/ActivityLogPage'
import UserPage from './pages/UserPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/approval" element={<ApprovalWait />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/admin/transactions" element={<Transactions userRole="admin" />} />
        <Route path="/staff/transactions" element={<Transactions userRole="staff" />} />
        <Route path="/admin/suppliers" element={<Suppliers userRole="admin" />} />
        <Route path="/staff/suppliers" element={<Suppliers userRole="staff" />} />
        <Route path="/admin/buyers" element={<Buyers userRole="admin" />} />
        <Route path="/staff/buyers" element={<Buyers userRole="staff" />} />
        <Route path="/admin/products" element={<Products userRole="admin" />} />
        <Route path="/staff/products" element={<Products userRole="staff" />} />
        <Route path="/admin/categories" element={<Categories userRole="admin" />} />
        <Route path="/staff/categories" element={<Categories userRole="staff" />} />
        <Route path="/staff/profile" element={<Profile userRole="staff" />} />
        <Route path="/staff/settings" element={<Settings userRole="staff" />} />
        <Route path="/admin/profile" element={<Profile userRole="admin" />} />
        <Route path="/admin/settings" element={<Settings userRole="amin" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-uuid" element={<ForgotPasswordUUID />} />
        <Route path="/verify-uuid" element={<VerifyUUID />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/staff/inventory" element={<Inventory userRole="staff" />} />
        <Route path="/admin/activity-logs" element={<ActivityLogPage userRole="admin" />} />
        <Route path="/admin/users" element={<UserPage userRole="admin" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}
