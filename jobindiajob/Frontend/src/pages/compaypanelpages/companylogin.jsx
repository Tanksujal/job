import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Building2 } from 'lucide-react';

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      companyEmail: email,
      password: password,
    };
    try {
      let response = await axios.post(`${apiurl}/company/login`, obj, { withCredentials: true });
      if (response.data.success) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/dashboard'); // Adjust this route as needed
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row h-100">
        <div className="col-lg-6 d-none d-lg-flex bg-primary text-white p-5 flex-column justify-content-center">
          <h2 className="display-4 mb-5">Welcome Back</h2>
          <img src="/api/placeholder/400/300" alt="Company Login" className="img-fluid mb-5 rounded shadow" />
          <ul className="list-unstyled fs-5">
            <li className="mb-3"><Building2 className="me-2" /> Access your company account</li>
            <li className="mb-3"><Mail className="me-2" /> Manage job postings</li>
            <li className="mb-3"><Lock className="me-2" /> Secure login process</li>
          </ul>
        </div>
        
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
          <div className="w-100" style={{maxWidth: '400px'}}>
            <h2 className="text-center mb-5">Login to Your Company Account</h2>
            
            {showAlert && (
              <div className="alert alert-success mb-4" role="alert">
                Login successful! Redirecting to dashboard...
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="input-group">
                  <span className="input-group-text"><Mail size={20} /></span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><Lock size={20} /></span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
              </div>
            </form>

            <div className="text-center mt-3">
              <a href="/register-company" className="text-decoration-none">Don't have an account? Register here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCompany;