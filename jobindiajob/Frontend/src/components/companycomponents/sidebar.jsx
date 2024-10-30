import { Link, useLocation } from "react-router-dom";
import {ChevronDown,} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/dashboard.css";
import { useEffect, useState } from "react";
const Sidebar = ({profile}) => {
  const apiurl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const [companyName,setcompanyName] = useState("")
useEffect(()=>{
    setcompanyName(profile.companyName)
},[profile])
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    {
      name: "Jobs",
      path: "/showjobs",
    },
    { name: "Profile", path: "#" },
    { name: "Application", path: "/application" },
   
  ];

  return (
    <div className="sidebar bg-white border-end p-4">
      <div className="d-flex align-items-center mb-4">
        <img
          src="/api/placeholder/40/40"
          alt="Logo"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <h1 className="h4 mb-0"></h1>
      </div>
      <div className="mb-4">
        <img
          src="../../public/user.png"
          alt="User"
          className="rounded-circle mb-2"
          width="48"
          height="48"
        />
        <h2 className="h6">{companyName}</h2>
        <p className="text-muted small">SuperAdmin</p>
      </div>
      <nav className="nav flex-column">
        {navItems.map((item) =>
          item.dropdown ? (
            <div key={item.name} className="dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                id={`${item.name.toLowerCase()}-dropdown`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {item.name} <ChevronDown size={16} className="ms-1" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`${item.name.toLowerCase()}-dropdown`}
              >
                {item.dropdown.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`dropdown-item ${
                        location.pathname === subItem.path ? "active" : ""
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : item.path === "#" ? (
            <a key={item.name} href="#" className="nav-link">
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};
export default Sidebar;
