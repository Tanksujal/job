import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Building2, Mail, Phone, Lock, Briefcase, Users, Receipt } from 'lucide-react';
const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      companyName: companyName,
      companyEmail: email,
      companyPhone: phone,
      password: password,
      industryType: industryType,
      numberOfEmployees: numberOfEmployees,
      gstNumber:gstNumber
    }
    try {
      let Response = await axios.post(`${apiurl}/company/register`,{obj},{withCredentials:true})
      if(Response.data.success){
        setShowAlert(true)
        navigate('/logincompany')
      }
    } catch (error) {
      console.log(error);
      return false
    }
    
   
    // setTimeout(() => {
    //   setShowAlert(true);
    //   setTimeout(() => {
    //     setShowAlert(false);
    //     navigate('/logincompany');
    //   }, 3000);
    // }, 1000);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row h-100">
        <div className="col-lg-6 d-none d-lg-flex bg-primary text-white p-5 flex-column justify-content-center">
          <h2 className="display-4 mb-5">Join Our Network</h2>
          <img src="/api/placeholder/400/300" alt="Company Registration" className="img-fluid mb-5 rounded shadow" />
          <ul className="list-unstyled fs-5">
            <li className="mb-3"><Building2 className="me-2" /> Post job listings</li>
            <li className="mb-3"><Users className="me-2" /> Attract top talent</li>
            <li className="mb-3"><Briefcase className="me-2" /> Manage applications efficiently</li>
          </ul>
        </div>
        
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
          <div className="w-100" style={{maxWidth: '400px'}}>
            <h2 className="text-center mb-5">Register Your Company</h2>
            
            {showAlert && (
              <div className="alert alert-success mb-4" role="alert">
                Company registered successfully! Redirecting to login...
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">Company Name</label>
                <div className="input-group">
                  <span className="input-group-text"><Building2 size={20} /></span>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    placeholder="Enter company name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>

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

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text"><Phone size={20} /></span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><Lock size={20} /></span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Create a password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="industryType" className="form-label">Industry Type</label>
                <div className="input-group">
                  <span className="input-group-text"><Briefcase size={20} /></span>
                  <select
                    className="form-select"
                    id="industryType"
                    required
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    <option value="IT">IT</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="numberOfEmployees" className="form-label">Number of Employees</label>
                <div className="input-group">
                  <span className="input-group-text"><Users size={20} /></span>
                  <select
                    className="form-select"
                    id="numberOfEmployees"
                    required
                    value={numberOfEmployees}
                    onChange={(e) => setNumberOfEmployees(e.target.value)}
                  >
                    <option value="">Select Employee Range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="gstNumber" className="form-label">GST Number</label>
                <div className="input-group">
                  <span className="input-group-text"><Receipt size={20} /></span>
                  <input
                    type="text"
                    className="form-control"
                    id="gstNumber"
                    placeholder="Enter GST number"
                    required
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">Register Now</button>
              </div>
            </form>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;