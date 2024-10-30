
import { useState } from 'react';
import '../../styles/loginuser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const navigate = useNavigate()
  const apiurl = import.meta.env.VITE_API_URL
  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      const response =  await axios.post(`${apiurl}/`,{email,password},{withCredentials:true})
      console.log(response.data)
      if(response.data.success){
        alert("Login Success")
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      return false
    }
  }
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <a href="#register" className="register-link">Register for free</a>
        
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="email">Email ID / Username</label>
            <input 
              type="text" 
              id="email" 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your active Email ID / Username" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e)=>setpassword(e.target.value) }
                placeholder="Enter your password" 
              />
              <button 
                type="button" 
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="login-options">
          <a href="#otp-login" className="otp-login">Use OTP to Login</a>
          <span className="or">Or</span>
          <button className="google-login">
            <img src="/path-to-google-icon.png" alt="Google" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;