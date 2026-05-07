import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ApprovalWait from './pages/ApprovalWait'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import Suppliers from './pages/Suppliers'
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-uuid" element={<ForgotPasswordUUID />} />
        <Route path="/verify-uuid" element={<VerifyUUID />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}
