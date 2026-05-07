import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ApprovalWait from './pages/ApprovalWait'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import Suppliers from './pages/Suppliers'
import Buyers from './pages/Buyers'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPasswordUUID from './pages/ForgotPasswordUUID'
import VerifyUUID from './pages/VerifyUUID'
import NewPassword from './pages/NewPassword'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/approval" element={<ApprovalWait />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/admin/suppliers" element={<Suppliers userRole="admin" />} />
        <Route path="/staff/suppliers" element={<Suppliers userRole="staff" />} />
        <Route path="/admin/buyers" element={<Buyers userRole="admin" />} />
        <Route path="/staff/buyers" element={<Buyers userRole="staff" />} />
        <Route path="/admin/products" element={<Products userRole="admin" />} />
        <Route path="/staff/products" element={<Products userRole="staff" />} />
        <Route path="/admin/categories" element={<Categories userRole="admin" />} />
        <Route path="/staff/categories" element={<Categories userRole="staff" />} />
        <Route path="/profile" element={<Profile userRole="staff" />} />
        <Route path="/settings" element={<Settings userRole="staff" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-uuid" element={<ForgotPasswordUUID />} />
        <Route path="/verify-uuid" element={<VerifyUUID />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}
