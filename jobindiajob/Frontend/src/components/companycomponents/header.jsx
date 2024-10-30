import {Bell,MessageSquare,Moon,Search,Plus,} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";
const Header = () => (
    <header className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <h2 className="navbar-brand mb-0 h1">Dashboard</h2>
        <form className="d-flex">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
            />
          </div>
        </form>
        <div className="d-flex align-items-center">
          <Link className="btn btn-light me-2" to={'/addjobs'}>
            <Plus size={18}  />
          </Link>
          <button className="btn btn-light me-2">
            <Moon size={18} />
          </button>
          <button className="btn btn-light me-2">
            <MessageSquare size={18} />
          </button>
          <button className="btn btn-light me-2">
            <Bell size={18} />
          </button>
          <img
            src="/api/placeholder/32/32"
            alt="User"
            className="rounded-circle"
            width="32"
            height="32"
          />
        </div>
      </div>
    </header>
  );
  export default Header;