import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar() {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="sidebar bg-dark text-white d-flex flex-column"
      style={{
        position: 'fixed', // Fix sidebar in place
        top: 0,
        left: 0,
        height: '100vh', // Full height
        width: '15%', // Adjust width as needed
        padding: '15px',
        overflow: 'hidden' // Prevent scrolling inside the sidebar
      }}>
      
      <div className='d-flex align-items-center py-3'>
        <i className="fas fa-bars fa-2x mt-1"></i>
        <h4 className='px-2 pt-1'>Menu</h4>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link px-3 py-2 text-white" to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-3 py-2 text-white" to="/courses">
            <i className="fas fa-book"></i> Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-3 py-2 text-white" to="/facultys">
            <i className="fas fa-user-tie"></i> Facultys
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-3 py-2 text-white" to="/students">
            <i className="fas fa-users"></i> Students
          </Link>
        </li>
        <li className="nav-item pt-2">
          <button className="btn btn-danger" onClick={Logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
