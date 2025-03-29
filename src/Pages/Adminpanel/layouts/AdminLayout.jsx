import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    navigate('/login');
  }; 

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h1 className="admin-title">Admin</h1>
        <ul className="sidebar-menu">
          <li>
            <button onClick={() => navigate('/admin')}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => navigate('/admin/recipes/add')}>Add Recipes</button>
          </li>
          <li>
            <button onClick={() => navigate('/admin/recipes/list')}>List Recipes</button>
          </li>
          <li>
            <button onClick={handleLogout}>LogOut</button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout; 