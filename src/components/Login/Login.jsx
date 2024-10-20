import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import Spinner from '../Spinner/Spinner'; // Import the Spinner component
import shield from '../../assets/shield.png';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner when login is clicked
    try {
      const response = await axios.post('https://server-auth-66bx.onrender.com/login', { email, password });
      const { user } = response.data;
      setUser(user); // Now stores the user data
      toast.success("Login successful!");
      setErrorMessage("");
      localStorage.setItem("savedEmail", email);
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      setErrorMessage(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false); // Stop spinner after API call completes
    }
  };

  return (
    <div className="login-container">    
    {loading ? (
        <Spinner />  // Show spinner when loading
      ) : (
        
      <form className="form-container" onSubmit={handleLogin}>
        <div className="title-container">
          <img src={shield} alt="Padlock Icon" className="padlock-icon" /> 
          <h3 className="title">AuthHash</h3>
          
        </div>
        <hr className="divider" />
        <h2 className="authText">Sign In</h2>
      <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button type="submit">Login</button>
          
        
      </>
    </form>
    
    )}
    </div>
  );
};

export default Login;
