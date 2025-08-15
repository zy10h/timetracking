import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Time Tracking and Attendance System</Link>
      <div>
        {user ? (
          <>
            <Link to="/Dashboard" className="mr-4">Dashboard</Link>
            <Link to="/attendance" className="mr-4">History</Link>
            <Link to="/leave/apply"   className="px-3 py-2 text-white/90 hover:text-white">Apply Leaves</Link>
            <Link to="/leave/history" className="px-3 py-2 text-white/90 hover:text-white">My Leaves</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>

          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
