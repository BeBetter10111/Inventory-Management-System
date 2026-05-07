import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Showcase from './pages/Showcase'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ApprovalWait from './pages/ApprovalWait'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPasswordUUID from './pages/ForgotPasswordUUID'
import VerifyUUID from './pages/VerifyUUID'
import NewPassword from './pages/NewPassword'

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-uuid" element={<ForgotPasswordUUID />} />
        <Route path="/verify-uuid" element={<VerifyUUID />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
