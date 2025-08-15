import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AttendanceHistory from './pages/AttendanceHistory';
import LeaveApply from './pages/LeaveApply';
import LeaveHistory from './pages/LeaveHistory';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<AttendanceHistory />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/leave/apply" element={<LeaveApply/>} />
        <Route path="/leave/history" element={<LeaveHistory/>} />
      </Routes>
    </Router>
  );
}

export default App;
