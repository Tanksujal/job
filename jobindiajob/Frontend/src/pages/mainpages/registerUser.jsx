import { useState } from 'react';
import axios from 'axios';
import '../../styles/registeruser.css';
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [status, setWorkStatus] = useState('');
  const navigate = useNavigate()
  const apiurl = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiurl}/register`, {
        fullName: fullName,
        email : email,
        password : password,
        mobileNumber :mobileNumber,
        status : status
      },{withCredentials : true});
     if(response.data.success){
      alert("User Registered Successfully");
      navigate('/loginuser')
     }
      // Handle successful registration (e.g., show success message, redirect user)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., show error message to user)
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src="/path-to-your-image.png" alt="Registration illustration" className="register-image" />
        <h2>On registering, you can</h2>
        <ul className="register-benefits">
          <li>Build your profile and let recruiters find you</li>
          <li>Get job postings delivered right to your email</li>
          <li>Find a job and grow your career</li>
        </ul>
      </div>
      <div className="register-right">
        <h1>Create your Naukri profile</h1>
        <p className="subtitle">Search & apply to jobs from India's No.1 Job Site</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full name*</label>
            <input
              type="text"
              id="fullName"
              placeholder="What is your name?"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID*</label>
            <input
              type="email"
              id="email"
              placeholder="Tell us your Email ID"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small>We'll send relevant jobs and updates to this email</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              placeholder="(Minimum 6 characters)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>This helps your account stay protected</small>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile number*</label>
            <div className="mobile-input">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter your mobile number"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <small>Recruiters will contact you on this number</small>
          </div>
          <div className="form-group">
            <label>Work status*</label>
            <div className="work-status-options">
              <label className="work-status-option">
                <input
                  type="radio"
                  name="workStatus"
                  value="experienced"
                  checked={status === 'experienced'}
                  onChange={(e) => setWorkStatus(e.target.value)}
                />
                <span>I'm experienced</span>
                <small>I have work experience (excluding internships)</small>
              </label>
              <label className="work-status-option">
                <input
                  type="radio"
                  name="workStatus"
                  value="fresher"
                  checked={status === 'fresher'}
                  onChange={(e) => setWorkStatus(e.target.value)}
                />
                <span>I'm a fresher</span>
                <small>I am a student/ Haven't worked after graduation</small>
              </label>
            </div>
          </div>
          <button type="submit" className="register-button">Register Now</button>
        </form>
        <div className="google-sign-in">
          <span>Or</span>
          <button className="google-button">
            <img src="/path-to-google-icon.png" alt="Google icon" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;