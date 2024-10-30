import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ShoppingCart } from 'lucide-react';
import '../../styles/navbar.css';

const Navbar = ({ user,isloggedin ,setSearchQuery}) => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query in Home
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/naukri-logo.png" alt="logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li className="active"><Link to="/jobs">Jobs<span className="notification-badge">1</span></Link></li>
          <li><Link to="/companies">Companies</Link></li>
          
        </ul>
      </div>
      <div className="navbar-center">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search jobs here" 
            onChange={handleSearchChange} // Handle search input
          />
        </div>
      </div>
      <div className="navbar-right">
        {isloggedin ? (
          <>
            <button className="btn btn-profile">
              <img src="../../../public/user.png" alt="Profile" className="profile-pic" />
            </button>
          </>
        ) : (
          <>
            <Link to="/loginuser" className="btn btn-login">Login</Link>
            <Link to="/registeruser" className="btn btn-register">Register</Link>
            <div className="dropdown">
            <li className="dropdown">
            <button onClick={toggleServicesDropdown}>
              For Job Post<span className="notification-badge">1</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {isServicesDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/service1" className='py-2'>Login</Link></li>
                <li><Link to="/service2">Register</Link></li>
                <li><Link to="/service3">Service 3</Link></li>
              </ul>
            )}
          </li>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;